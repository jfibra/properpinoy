-- Updated RLS policies for all tables in complete schema
-- Row Level Security Policies for ProperPinoy Complete Schema

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Credits policies
CREATE POLICY "Users can view own credits" ON public.credits
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own credits" ON public.credits
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can insert credits" ON public.credits
    FOR INSERT WITH CHECK (true);

-- Properties policies
CREATE POLICY "Anyone can view active properties" ON public.properties
    FOR SELECT USING (status = 'active');

CREATE POLICY "Users can view own properties" ON public.properties
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own properties" ON public.properties
    FOR ALL USING (auth.uid() = user_id);

-- Property photos policies
CREATE POLICY "Anyone can view property photos" ON public.property_photos
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.properties WHERE id = property_id AND status = 'active')
    );

CREATE POLICY "Users can manage photos of own properties" ON public.property_photos
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.properties WHERE id = property_id AND user_id = auth.uid())
    );

-- User profiles policies
CREATE POLICY "Users can view own user profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own user profile" ON public.user_profiles
    FOR ALL USING (auth.uid() = user_id);

-- Inquiries policies
CREATE POLICY "Users can view inquiries for own properties" ON public.inquiries
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.properties WHERE id = property_id AND user_id = auth.uid())
    );

CREATE POLICY "Anyone can create inquiries" ON public.inquiries
    FOR INSERT WITH CHECK (true);

-- Payment methods policies
CREATE POLICY "Users can manage own payment methods" ON public.payment_methods
    FOR ALL USING (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage subscriptions" ON public.subscriptions
    FOR ALL WITH CHECK (true);

-- Transactions policies
CREATE POLICY "Users can view own transactions" ON public.transactions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert transactions" ON public.transactions
    FOR INSERT WITH CHECK (true);
