-- Insert transport categories if they don't exist
INSERT INTO main.transport_category (name)
SELECT 'Ônibus'
WHERE NOT EXISTS (SELECT 1 FROM main.transport_category WHERE name = 'Ônibus');

INSERT INTO main.transport_category (name)
SELECT 'Trem'
WHERE NOT EXISTS (SELECT 1 FROM main.transport_category WHERE name = 'Trem');

INSERT INTO main.transport_category (name)
SELECT 'Metrô'
WHERE NOT EXISTS (SELECT 1 FROM main.transport_category WHERE name = 'Metrô');

-- Insert staff positions if they don't exist
INSERT INTO main.staff_position (name, description, salary)
SELECT 'Motorista', 'Responsável por dirigir o veículo.', 2500
WHERE NOT EXISTS (SELECT 1 FROM main.staff_position WHERE name = 'Motorista');

INSERT INTO main.staff_position (name, description, salary)
SELECT 'Fiscal', 'Responsável por fiscalizar os passageiros.', 2200
WHERE NOT EXISTS (SELECT 1 FROM main.staff_position WHERE name = 'Fiscal');

INSERT INTO main.staff_position (name, description, salary)
SELECT 'Supervisor', 'Responsável por supervisionar as operações.', 3000
WHERE NOT EXISTS (SELECT 1 FROM main.staff_position WHERE name = 'Supervisor');

-- Insert locations if they don't exist
INSERT INTO main.location (address, category_id, is_station)
SELECT 'Rua A, 123', c.id, false
FROM main.transport_category c
WHERE c.name = 'Ônibus'
  AND NOT EXISTS (SELECT 1 FROM main.location WHERE address = 'Rua A, 123');

INSERT INTO main.location (address, category_id, is_station)
SELECT 'Rua B, 456', c.id, false
FROM main.transport_category c
WHERE c.name = 'Ônibus'
  AND NOT EXISTS (SELECT 1 FROM main.location WHERE address = 'Rua B, 456');

INSERT INTO main.location (address, category_id, is_station)
SELECT 'Rua C, 789', c.id, false
FROM main.transport_category c
WHERE c.name = 'Ônibus'
  AND NOT EXISTS (SELECT 1 FROM main.location WHERE address = 'Rua C, 789');

INSERT INTO main.location (address, category_id, is_station)
SELECT 'Terminal Central', c.id, true
FROM main.transport_category c
WHERE c.name = 'Ônibus'
  AND NOT EXISTS (SELECT 1 FROM main.location WHERE address = 'Terminal Central');

INSERT INTO main.location (address, category_id, is_station)
SELECT 'Terminal Norte', c.id, true
FROM main.transport_category c
WHERE c.name = 'Ônibus'
  AND NOT EXISTS (SELECT 1 FROM main.location WHERE address = 'Terminal Norte');

INSERT INTO main.location (address, category_id, is_station)
SELECT 'Terminal Sul', c.id, true
FROM main.transport_category c
WHERE c.name = 'Ônibus'
  AND NOT EXISTS (SELECT 1 FROM main.location WHERE address = 'Terminal Sul');

INSERT INTO main.location (address, category_id, is_station)
SELECT 'Estação Sul', c.id, true
FROM main.transport_category c
WHERE c.name = 'Trem'
  AND NOT EXISTS (SELECT 1 FROM main.location WHERE address = 'Estação Sul');

INSERT INTO main.location (address, category_id, is_station)
SELECT 'Estação Leste', c.id, true
FROM main.transport_category c
WHERE c.name = 'Trem'
  AND NOT EXISTS (SELECT 1 FROM main.location WHERE address = 'Estação Leste');

INSERT INTO main.location (address, category_id, is_station)
SELECT 'Estação Oeste', c.id, true
FROM main.transport_category c
WHERE c.name = 'Trem'
  AND NOT EXISTS (SELECT 1 FROM main.location WHERE address = 'Estação Oeste');

INSERT INTO main.location (address, category_id, is_station)
SELECT 'Estação 1', c.id, true
FROM main.transport_category c
WHERE c.name = 'Metrô'
  AND NOT EXISTS (SELECT 1 FROM main.location WHERE address = 'Estação 1');

INSERT INTO main.location (address, category_id, is_station)
SELECT 'Estação 2', c.id, true
FROM main.transport_category c
WHERE c.name = 'Metrô'
  AND NOT EXISTS (SELECT 1 FROM main.location WHERE address = 'Estação 2');

INSERT INTO main.location (address, category_id, is_station)
SELECT 'Estação 3', c.id, true
FROM main.transport_category c
WHERE c.name = 'Metrô'
  AND NOT EXISTS (SELECT 1 FROM main.location WHERE address = 'Estação 3');

-- Insert routes if they don't exist
INSERT INTO main.route (name, location_start_id, location_destiny_id, distance)
SELECT 'Rota A', ls.id, ld.id, 10
FROM main.location ls, main.location ld
WHERE ls.address = 'Rua A, 123'
  AND ld.address = 'Terminal Central'
  AND NOT EXISTS (
    SELECT 1 FROM main.route
    WHERE name = 'Rota A'
      AND location_start_id = ls.id
      AND location_destiny_id = ld.id
  );

INSERT INTO main.route (name, location_start_id, location_destiny_id, distance)
SELECT 'Rota B', ls.id, ld.id, 20
FROM main.location ls, main.location ld
WHERE ls.address = 'Estação Norte'
  AND ld.address = 'Estação Sul'
  AND NOT EXISTS (
    SELECT 1 FROM main.route
    WHERE name = 'Rota B'
      AND location_start_id = ls.id
      AND location_destiny_id = ld.id
  );

INSERT INTO main.route (name, location_start_id, location_destiny_id, distance)
SELECT 'Rota C', ls.id, ld.id, 15
FROM main.location ls, main.location ld
WHERE ls.address = 'Estação Leste'
  AND ld.address = 'Estação Oeste'
  AND NOT EXISTS (
    SELECT 1 FROM main.route
    WHERE name = 'Rota C'
      AND location_start_id = ls.id
      AND location_destiny_id = ld.id
  );

INSERT INTO main.route (name, location_start_id, location_destiny_id, distance)
SELECT 'Rota D', ls.id, ld.id, 5
FROM main.location ls, main.location ld
WHERE ls.address = 'Estação 1'
  AND ld.address = 'Estação 2'
  AND NOT EXISTS (
    SELECT 1 FROM main.route
    WHERE name = 'Rota D'
      AND location_start_id = ls.id
      AND location_destiny_id = ld.id
  );

INSERT INTO main.route (name, location_start_id, location_destiny_id, distance)
SELECT 'Rota E', ls.id, ld.id, 8
FROM main.location ls, main.location ld
WHERE ls.address = 'Estação 2'
  AND ld.address = 'Estação 3'
  AND NOT EXISTS (
    SELECT 1 FROM main.route
    WHERE name = 'Rota E'
      AND location_start_id = ls.id
      AND location_destiny_id = ld.id
  );

INSERT INTO main.route (name, location_start_id, location_destiny_id, distance)
SELECT 'Rota F', ls.id, ld.id, 18
FROM main.location ls, main.location ld
WHERE ls.address = 'Terminal Central'
  AND ld.address = 'Terminal Norte'
  AND NOT EXISTS (
    SELECT 1 FROM main.route
    WHERE name = 'Rota F'
      AND location_start_id = ls.id
      AND location_destiny_id = ld.id
  );

-- Insert vehicles if they don't exist
INSERT INTO main.vehicle (category_id, manufacturer, model, year, capacity)
SELECT
  (SELECT id FROM main.transport_category WHERE name = 'Ônibus'),
  'ABC Motors',
  'Modelo X',
  2022,
  50
WHERE NOT EXISTS (
  SELECT 1 FROM main.vehicle
  WHERE manufacturer = 'ABC Motors' AND model = 'Modelo X'
);

INSERT INTO main.vehicle (category_id, manufacturer, model, year, capacity)
SELECT
  (SELECT id FROM main.transport_category WHERE name = 'Ônibus'),
  'XYZ Motors',
  'Modelo Y',
  2023,
  40
WHERE NOT EXISTS (
  SELECT 1 FROM main.vehicle
  WHERE manufacturer = 'XYZ Motors' AND model = 'Modelo Y'
);

INSERT INTO main.vehicle (category_id, manufacturer, model, year, capacity)
SELECT
  (SELECT id FROM main.transport_category WHERE name = 'Trem'),
  '123 Railways',
  'Modelo A',
  2022,
  200
WHERE NOT EXISTS (
  SELECT 1 FROM main.vehicle
  WHERE manufacturer = '123 Railways' AND model = 'Modelo A'
);

INSERT INTO main.vehicle (category_id, manufacturer, model, year, capacity)
SELECT
  (SELECT id FROM main.transport_category WHERE name = 'Trem'),
  '456 Railways',
  'Modelo B',
  2021,
  150
WHERE NOT EXISTS (
  SELECT 1 FROM main.vehicle
  WHERE manufacturer = '456 Railways' AND model = 'Modelo B'
);

INSERT INTO main.vehicle (category_id, manufacturer, model, year, capacity)
SELECT
  (SELECT id FROM main.transport_category WHERE name = 'Metrô'),
  'MetroWave',
  'Modelo M',
  2023,
  300
WHERE NOT EXISTS (
  SELECT 1 FROM main.vehicle
  WHERE manufacturer = 'MetroWave' AND model = 'Modelo M'
);

-- Insert vehicle routes if they don't exist
INSERT INTO main.vehicle_route (vehicle_id, route_id, time_init, time_end)
SELECT v.id, r.id, '08:00:00', '09:00:00'
FROM main.vehicle v, main.route r
WHERE v.manufacturer = 'ABC Motors'
  AND r.name = 'Rota A'
  AND NOT EXISTS (
    SELECT 1 FROM main.vehicle_route
    WHERE vehicle_id = v.id
      AND route_id = r.id
  );

INSERT INTO main.vehicle_route (vehicle_id, route_id, time_init, time_end)
SELECT v.id, r.id, '10:00:00', '11:00:00'
FROM main.vehicle v, main.route r
WHERE v.manufacturer = 'ABC Motors'
  AND r.name = 'Rota B'
  AND NOT EXISTS (
    SELECT 1 FROM main.vehicle_route
    WHERE vehicle_id = v.id
      AND route_id = r.id
  );

INSERT INTO main.vehicle_route (vehicle_id, route_id, time_init, time_end)
SELECT v.id, r.id, '13:00:00', '14:00:00'
FROM main.vehicle v, main.route r
WHERE v.manufacturer = 'XYZ Motors'
  AND r.name = 'Rota C'
  AND NOT EXISTS (
    SELECT 1 FROM main.vehicle_route
    WHERE vehicle_id = v.id
      AND route_id = r.id
  );

INSERT INTO main.vehicle_route (vehicle_id, route_id, time_init, time_end)
SELECT v.id, r.id, '15:00:00', '15:30:00'
FROM main.vehicle v, main.route r
WHERE v.manufacturer = '123 Railways'
  AND r.name = 'Rota D'
  AND NOT EXISTS (
    SELECT 1 FROM main.vehicle_route
    WHERE vehicle_id = v.id
      AND route_id = r.id
  );

INSERT INTO main.vehicle_route (vehicle_id, route_id, time_init, time_end)
SELECT v.id, r.id, '18:00:00', '18:30:00'
FROM main.vehicle v, main.route r
WHERE v.manufacturer = 'MetroWave'
  AND r.name = 'Rota E'
  AND NOT EXISTS (
    SELECT 1 FROM main.vehicle_route
    WHERE vehicle_id = v.id
      AND route_id = r.id
  );

-- Insert passengers if they don't exist
INSERT INTO main.passenger (name, email, phone)
SELECT 'João Silva', 'joao@example.com', '1234567890'
WHERE NOT EXISTS (
  SELECT 1 FROM main.passenger
  WHERE name = 'João Silva'
);

INSERT INTO main.passenger (name, email, phone)
SELECT 'Maria Santos', 'maria@example.com', '9876543210'
WHERE NOT EXISTS (
  SELECT 1 FROM main.passenger
  WHERE name = 'Maria Santos'
);

INSERT INTO main.passenger (name, email, phone)
SELECT 'Pedro Oliveira', 'pedro@example.com', '4567891230'
WHERE NOT EXISTS (
  SELECT 1 FROM main.passenger
  WHERE name = 'Pedro Oliveira'
);

INSERT INTO main.passenger (name, email, phone)
SELECT 'Ana Pereira', 'ana@example.com', '3216549870'
WHERE NOT EXISTS (
  SELECT 1 FROM main.passenger
  WHERE name = 'Ana Pereira'
);

INSERT INTO main.passenger (name, email, phone)
SELECT 'Carlos Souza', 'carlos@example.com', '9873216540'
WHERE NOT EXISTS (
  SELECT 1 FROM main.passenger
  WHERE name = 'Carlos Souza'
);

-- Insert transportation records if they don't already exist
INSERT INTO main.transportation (date, passenger_id, vehicle_id)
SELECT '2023-06-01', p.id, v.id
FROM main.passenger p
CROSS JOIN main.vehicle v
WHERE p.name = 'João Silva'
  AND v.manufacturer = 'ABC Motors'
  AND NOT EXISTS (
    SELECT 1
    FROM main.transportation t
    WHERE t.date = '2023-06-01'
      AND t.passenger_id = p.id
      AND t.vehicle_id = v.id
  );

INSERT INTO main.transportation (date, passenger_id, vehicle_id)
SELECT '2023-06-02', p.id, v.id
FROM main.passenger p
CROSS JOIN main.vehicle v
WHERE p.name = 'Maria Santos'
  AND v.manufacturer = 'ABC Motors'
  AND NOT EXISTS (
    SELECT 1
    FROM main.transportation t
    WHERE t.date = '2023-06-02'
      AND t.passenger_id = p.id
      AND t.vehicle_id = v.id
  );

INSERT INTO main.transportation (date, passenger_id, vehicle_id)
SELECT '2023-06-03', p.id, v.id
FROM main.passenger p
CROSS JOIN main.vehicle v
WHERE p.name = 'Pedro Oliveira'
  AND v.manufacturer = 'XYZ Motors'
  AND NOT EXISTS (
    SELECT 1
    FROM main.transportation t
    WHERE t.date = '2023-06-03'
      AND t.passenger_id = p.id
      AND t.vehicle_id = v.id
  );

INSERT INTO main.transportation (date, passenger_id, vehicle_id)
SELECT '2023-06-04', p.id, v.id
FROM main.passenger p
CROSS JOIN main.vehicle v
WHERE p.name = 'Ana Pereira'
  AND v.manufacturer = '123 Railways'
  AND NOT EXISTS (
    SELECT 1
    FROM main.transportation t
    WHERE t.date = '2023-06-04'
      AND t.passenger_id = p.id
      AND t.vehicle_id = v.id
  );

INSERT INTO main.transportation (date, passenger_id, vehicle_id)
SELECT '2023-06-05', p.id, v.id
FROM main.passenger p
CROSS JOIN main.vehicle v
WHERE p.name = 'Carlos Souza'
  AND v.manufacturer = 'MetroWave'
  AND NOT EXISTS (
    SELECT 1
    FROM main.transportation t
    WHERE t.date = '2023-06-05'
      AND t.passenger_id = p.id
      AND t.vehicle_id = v.id
  );

-- Insert feedback records if they don't already exist
INSERT INTO main.feedback (passenger_id, comment, rating)
SELECT p.id, 'Ótimo serviço!', 5
FROM main.passenger p
WHERE p.name = 'João Silva'
  AND NOT EXISTS (
    SELECT 1
    FROM main.feedback f
    WHERE f.passenger_id = p.id
      AND f.comment = 'Ótimo serviço!'
      AND f.rating = 5
  );

INSERT INTO main.feedback (passenger_id, comment, rating)
SELECT p.id, 'Motorista educado.', 4
FROM main.passenger p
WHERE p.name = 'Maria Santos'
  AND NOT EXISTS (
    SELECT 1
    FROM main.feedback f
    WHERE f.passenger_id = p.id
      AND f.comment = 'Motorista educado.'
      AND f.rating = 4
  );

INSERT INTO main.feedback (passenger_id, comment, rating)
SELECT p.id, 'Atraso no horário.', 3
FROM main.passenger p
WHERE p.name = 'Pedro Oliveira'
  AND NOT EXISTS (
    SELECT 1
    FROM main.feedback f
    WHERE f.passenger_id = p.id
      AND f.comment = 'Atraso no horário.'
      AND f.rating = 3
  );

INSERT INTO main.feedback (passenger_id, comment, rating)
SELECT p.id, 'Trem lotado.', 2
FROM main.passenger p
WHERE p.name = 'Ana Pereira'
  AND NOT EXISTS (
    SELECT 1
    FROM main.feedback f
    WHERE f.passenger_id = p.id
      AND f.comment = 'Trem lotado.'
      AND f.rating = 2
  );
