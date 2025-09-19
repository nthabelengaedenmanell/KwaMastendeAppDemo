-- Insert sample properties for KwaMastende App
INSERT INTO properties (
  title, description, bedrooms, bathrooms, monthly_rent, deposit_amount,
  province, township, street_address, landlord_name, landlord_phone, landlord_email,
  features, images
) VALUES 
(
  'Modern 2-Bedroom Apartment in Soweto',
  'Beautiful modern apartment with updated kitchen and bathroom. Close to transport and shopping centers.',
  2, 1, 3500.00, 3500.00,
  'Gauteng', 'Soweto', '123 Vilakazi Street, Orlando West',
  'John Mthembu', '+27 82 123 4567', 'john.mthembu@email.com',
  ARRAY['Modern Kitchen', 'Secure Parking', 'Garden', 'Close to Transport'],
  ARRAY['/modern-kitchen-interior.png', '/cozy-bedroom.png', '/modern-bathroom-interior.png']
),
(
  'Spacious 3-Bedroom House in Alexandra',
  'Family home with large yard, perfect for children. Recently renovated with modern fixtures.',
  3, 2, 4200.00, 4200.00,
  'Gauteng', 'Alexandra', '45 Roosevelt Street, Alexandra',
  'Sarah Ndlovu', '+27 83 987 6543', 'sarah.ndlovu@email.com',
  ARRAY['Large Yard', 'Recently Renovated', 'Family Friendly', 'Safe Neighborhood'],
  ARRAY['/cozy-living-room.png', '/cozy-bedroom.png', '/modern-kitchen-interior.png']
),
(
  'Affordable 1-Bedroom Flat in Tembisa',
  'Cozy one-bedroom flat ideal for young professionals. Walking distance to taxi rank.',
  1, 1, 2800.00, 2800.00,
  'Gauteng', 'Tembisa', '78 Makoma Street, Tembisa',
  'Peter Sibeko', '+27 84 555 7890', 'peter.sibeko@email.com',
  ARRAY['Close to Transport', 'Affordable', 'Young Professional Friendly'],
  ARRAY['/cozy-bedroom.png', '/modern-bathroom-interior.png']
),
(
  'Beautiful 2-Bedroom in Khayelitsha',
  'Well-maintained property with stunning views. Includes built-in cupboards and modern appliances.',
  2, 1, 3200.00, 3200.00,
  'Western Cape', 'Khayelitsha', '12 Mandela Avenue, Site C',
  'Nomsa Jacobs', '+27 21 123 4567', 'nomsa.jacobs@email.com',
  ARRAY['Mountain Views', 'Built-in Cupboards', 'Modern Appliances', 'Well Maintained'],
  ARRAY['/cozy-living-room.png', '/modern-kitchen-interior.png', '/cozy-bedroom.png']
),
(
  'Family Home in Mamelodi',
  'Large 4-bedroom family home with double garage. Perfect for growing families.',
  4, 2, 5500.00, 5500.00,
  'Gauteng', 'Mamelodi', '89 Stanza Bopape Street, Mamelodi West',
  'David Mashaba', '+27 82 777 8888', 'david.mashaba@email.com',
  ARRAY['Double Garage', 'Large Family Home', 'Growing Family', 'Secure Area'],
  ARRAY['/cozy-living-room.png', '/cozy-bedroom.png', '/modern-kitchen-interior.png', '/modern-bathroom-interior.png']
);
