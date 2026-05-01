-- Supabase Database Schema for Giada Marinaro Nutritionist Website

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  cognome VARCHAR(50) NOT NULL,
  email VARCHAR(254) NOT NULL,
  telefono VARCHAR(20),
  messaggio TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create calendar_events table for availability
CREATE TABLE IF NOT EXISTS calendar_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  "start" TIMESTAMP WITH TIME ZONE NOT NULL,
  "end" TIMESTAMP WITH TIME ZONE NOT NULL,
  description TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_calendar_events_start ON calendar_events("start");
CREATE INDEX IF NOT EXISTS idx_calendar_events_end ON calendar_events("end");
CREATE INDEX IF NOT EXISTS idx_calendar_events_available ON calendar_events(is_available);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

-- Create policies for contacts table
-- Allow public to insert contacts (for contact form)
CREATE POLICY "Allow public to insert contacts" ON contacts
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read contacts (for admin)
CREATE POLICY "Allow authenticated users to read contacts" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create policies for calendar_events table
-- Allow public to read available events
CREATE POLICY "Allow public to read available events" ON calendar_events
  FOR SELECT USING (is_available = true);

-- Allow authenticated users to manage all events
CREATE POLICY "Allow authenticated users to manage events" ON calendar_events
  FOR ALL USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_contacts_updated_at 
  BEFORE UPDATE ON contacts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_events_updated_at 
  BEFORE UPDATE ON calendar_events 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample available time slots
INSERT INTO calendar_events (title, "start", "end", description, is_available) VALUES
  ('Disponibile', '2025-01-20 09:00:00+01', '2025-01-20 10:00:00+01', 'Prima visita nutrizionale', true),
  ('Disponibile', '2025-01-20 10:30:00+01', '2025-01-20 11:30:00+01', 'Prima visita nutrizionale', true),
  ('Disponibile', '2025-01-20 14:00:00+01', '2025-01-20 15:00:00+01', 'Prima visita nutrizionale', true),
  ('Disponibile', '2025-01-21 09:00:00+01', '2025-01-21 10:00:00+01', 'Prima visita nutrizionale', true),
  ('Disponibile', '2025-01-21 10:30:00+01', '2025-01-21 11:30:00+01', 'Prima visita nutrizionale', true),
  ('Disponibile', '2025-01-21 15:00:00+01', '2025-01-21 16:00:00+01', 'Prima visita nutrizionale', true),
  ('Disponibile', '2025-01-22 09:00:00+01', '2025-01-22 10:00:00+01', 'Prima visita nutrizionale', true),
  ('Disponibile', '2025-01-22 11:00:00+01', '2025-01-22 12:00:00+01', 'Prima visita nutrizionale', true),
  ('Disponibile', '2025-01-22 14:30:00+01', '2025-01-22 15:30:00+01', 'Prima visita nutrizionale', true),
  ('Disponibile', '2025-01-23 09:30:00+01', '2025-01-23 10:30:00+01', 'Prima visita nutrizionale', true),
  ('Disponibile', '2025-01-23 11:00:00+01', '2025-01-23 12:00:00+01', 'Prima visita nutrizionale', true),
  ('Disponibile', '2025-01-23 15:00:00+01', '2025-01-23 16:00:00+01', 'Prima visita nutrizionale', true);
