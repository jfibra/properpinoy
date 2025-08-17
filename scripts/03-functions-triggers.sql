-- Updated functions and triggers for complete schema with separate credits table
-- Functions and Triggers for ProperPinoy Complete Schema

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (id, email, full_name, phone, company, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'company', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  
  -- Create credits record with 5 free credits
  INSERT INTO public.credits (user_id, credits_available, credits_used)
  VALUES (NEW.id, 5, 0);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to deduct credits when property is created
CREATE OR REPLACE FUNCTION deduct_credit_on_property_creation()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if user has enough credits
  IF (SELECT credits_available FROM public.credits WHERE user_id = NEW.user_id) < 1 THEN
    RAISE EXCEPTION 'Insufficient credits to create property listing';
  END IF;
  
  -- Deduct credit and increment used credits
  UPDATE public.credits 
  SET credits_available = credits_available - 1,
      credits_used = credits_used + 1,
      last_updated = NOW()
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for credit deduction
DROP TRIGGER IF EXISTS on_property_created ON public.properties;
CREATE TRIGGER on_property_created
  AFTER INSERT ON public.properties
  FOR EACH ROW EXECUTE FUNCTION deduct_credit_on_property_creation();

-- Function to refund credit when property is deleted
CREATE OR REPLACE FUNCTION refund_credit_on_property_deletion()
RETURNS TRIGGER AS $$
BEGIN
  -- Refund credit
  UPDATE public.credits 
  SET credits_available = credits_available + 1,
      credits_used = credits_used - 1,
      last_updated = NOW()
  WHERE user_id = OLD.user_id;
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for credit refund
DROP TRIGGER IF EXISTS on_property_deleted ON public.properties;
CREATE TRIGGER on_property_deleted
  AFTER DELETE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION refund_credit_on_property_deletion();
