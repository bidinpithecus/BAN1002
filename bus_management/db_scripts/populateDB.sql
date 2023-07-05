INSERT INTO main.transport_category (name) VALUES
  ('Ônibus'),
  ('Trem'),
  ('Metrô');

INSERT INTO main.staff_position (name, description, salary) VALUES
  ('Motorista', 'Responsável por dirigir o veículo.', 2500),
  ('Fiscal', 'Responsável por fiscalizar os passageiros.', 2200),
  ('Supervisor', 'Responsável por supervisionar as operações.', 3000);

INSERT INTO main.location (address, category_id, is_station) VALUES
  ('Rua A, 123', (SELECT id FROM main.transport_category WHERE name = 'Ônibus'), false),
  ('Rua B, 456', (SELECT id FROM main.transport_category WHERE name = 'Ônibus'), false),
  ('Rua C, 789', (SELECT id FROM main.transport_category WHERE name = 'Ônibus'), false),
  ('Terminal Central', (SELECT id FROM main.transport_category WHERE name = 'Ônibus'), true),
  ('Terminal Norte', (SELECT id FROM main.transport_category WHERE name = 'Ônibus'), true),
  ('Terminal Sul', (SELECT id FROM main.transport_category WHERE name = 'Ônibus'), true),
  ('Estação Central', (SELECT id FROM main.transport_category WHERE name = 'Trem'), true),
  ('Estação Norte', (SELECT id FROM main.transport_category WHERE name = 'Trem'), true),
  ('Estação Sul', (SELECT id FROM main.transport_category WHERE name = 'Trem'), true),
  ('Estação Leste', (SELECT id FROM main.transport_category WHERE name = 'Trem'), true),
  ('Estação Oeste', (SELECT id FROM main.transport_category WHERE name = 'Trem'), true),
  ('Estação 1', (SELECT id FROM main.transport_category WHERE name = 'Metrô'), true),
  ('Estação 2', (SELECT id FROM main.transport_category WHERE name = 'Metrô'), true),
  ('Estação 3', (SELECT id FROM main.transport_category WHERE name = 'Metrô'), true);

INSERT INTO main.route (name, location_start_id, location_destiny_id, distance) VALUES
  ('Rota Rua A - Terminal Central', (SELECT id FROM main.location WHERE address = 'Rua A, 123'), (SELECT id FROM main.location WHERE address = 'Terminal Central'), 10),
  ('Rota Terminal Central - Terminal Norte', (SELECT id FROM main.location WHERE address = 'Terminal Central'), (SELECT id FROM main.location WHERE address = 'Terminal Norte'), 18);

INSERT INTO main.vehicle (category_id, manufacturer, model, year, capacity) VALUES
  ((SELECT id FROM main.transport_category WHERE name = 'Ônibus'), 'ABC Motors', 'Modelo X', 2022, 50),
  ((SELECT id FROM main.transport_category WHERE name = 'Ônibus'), 'XYZ Motors', 'Modelo Y', 2023, 40),
  ((SELECT id FROM main.transport_category WHERE name = 'Trem'), '123 Railways', 'Modelo A', 2022, 200),
  ((SELECT id FROM main.transport_category WHERE name = 'Trem'), '456 Railways', 'Modelo B', 2021, 150),
  ((SELECT id FROM main.transport_category WHERE name = 'Metrô'), 'MetroWave', 'Modelo M', 2023, 300);

INSERT INTO main.vehicle_route (vehicle_id, route_id, time_init, time_end) VALUES
  ((SELECT id FROM main.vehicle WHERE manufacturer = 'ABC Motors'), (SELECT id FROM main.route WHERE name = 'Rota Rua A - Terminal Central'), '08:00:00', '09:00:00'),
  ((SELECT id FROM main.vehicle WHERE manufacturer = 'ABC Motors'), (SELECT id FROM main.route WHERE name = 'Rota Terminal Central - Terminal Norte'), '10:00:00', '11:00:00');

INSERT INTO main.passenger (name, email, phone) VALUES
  ('João Silva', 'joao@example.com', '1234567890'),
  ('Maria Santos', 'maria@example.com', '9876543210'),
  ('Pedro Oliveira', 'pedro@example.com', '4567891230'),
  ('Ana Pereira', 'ana@example.com', '3216549870'),
  ('Carlos Souza', 'carlos@example.com', '9873216540');

INSERT INTO main.transportation (date, passenger_id, vehicle_id) VALUES
  ('2023-06-01', (SELECT id FROM main.passenger WHERE name = 'João Silva'), (SELECT id FROM main.vehicle WHERE model = 'Modelo X')),
  ('2023-06-02', (SELECT id FROM main.passenger WHERE name = 'João Silva'), (SELECT id FROM main.vehicle WHERE model = 'Modelo X')),
  ('2023-06-03', (SELECT id FROM main.passenger WHERE name = 'João Silva'), (SELECT id FROM main.vehicle WHERE model = 'Modelo X')),
  ('2023-06-02', (SELECT id FROM main.passenger WHERE name = 'Maria Santos'), (SELECT id FROM main.vehicle WHERE model = 'Modelo X')),
  ('2023-06-03', (SELECT id FROM main.passenger WHERE name = 'Pedro Oliveira'), (SELECT id FROM main.vehicle WHERE model = 'Modelo Y')),
  ('2023-06-13', (SELECT id FROM main.passenger WHERE name = 'Pedro Oliveira'), (SELECT id FROM main.vehicle WHERE model = 'Modelo Y')),
  ('2023-06-04', (SELECT id FROM main.passenger WHERE name = 'Ana Pereira'), (SELECT id FROM main.vehicle WHERE model = 'Modelo A')),
  ('2023-06-05', (SELECT id FROM main.passenger WHERE name = 'Carlos Souza'), (SELECT id FROM main.vehicle WHERE model = 'Modelo M'));

INSERT INTO main.feedback (passenger_id, comment, rating) VALUES
  ((SELECT id FROM main.passenger WHERE name = 'João Silva'), 'Ótimo serviço!', 5),
  ((SELECT id FROM main.passenger WHERE name = 'Maria Santos'), 'Motorista educado.', 4),
  ((SELECT id FROM main.passenger WHERE name = 'Pedro Oliveira'), 'Atraso no horário.', 3),
  ((SELECT id FROM main.passenger WHERE name = 'Ana Pereira'), 'Trem lotado.', 2);

INSERT INTO main.route (name, location_start_id, location_destiny_id, distance)
VALUES
  ('Rota Estação Central - Estação Norte', (SELECT id FROM main.location WHERE address = 'Estação Central'), (SELECT id FROM main.location WHERE address = 'Estação Norte'), 12),
  ('Rota Estação Norte - Estação Sul', (SELECT id FROM main.location WHERE address = 'Estação Norte'), (SELECT id FROM main.location WHERE address = 'Estação Sul'), 15),
  ('Rota Estação Sul - Estação Leste', (SELECT id FROM main.location WHERE address = 'Estação Sul'), (SELECT id FROM main.location WHERE address = 'Estação Leste'), 8),
  ('Rota Estação Leste - Estação Oeste', (SELECT id FROM main.location WHERE address = 'Estação Leste'), (SELECT id FROM main.location WHERE address = 'Estação Oeste'), 10);

INSERT INTO main.vehicle_route (vehicle_id, route_id, time_init, time_end)
VALUES
  ((SELECT id FROM main.vehicle WHERE manufacturer = '123 Railways'), (SELECT id FROM main.route WHERE name = 'Rota Estação Central - Estação Norte'), '08:00:00', '08:30:00'),
  ((SELECT id FROM main.vehicle WHERE manufacturer = '123 Railways'), (SELECT id FROM main.route WHERE name = 'Rota Estação Norte - Estação Sul'), '09:00:00', '09:30:00'),
  ((SELECT id FROM main.vehicle WHERE manufacturer = '123 Railways'), (SELECT id FROM main.route WHERE name = 'Rota Estação Sul - Estação Leste'), '10:00:00', '10:15:00'),
  ((SELECT id FROM main.vehicle WHERE manufacturer = '123 Railways'), (SELECT id FROM main.route WHERE name = 'Rota Estação Leste - Estação Oeste'), '10:30:00', '11:00:00');

INSERT INTO main.staff (name, position_id) VALUES
  ('Sofia Martins', (SELECT id FROM main.staff_position WHERE name = 'Motorista')),
  ('Gabriel Silva', (SELECT id FROM main.staff_position WHERE name = 'Motorista')),
  ('Laura Costa', (SELECT id FROM main.staff_position WHERE name = 'Motorista')),
  ('Matheus Almeida', (SELECT id FROM main.staff_position WHERE name = 'Motorista')),
  ('Isabella Santos', (SELECT id FROM main.staff_position WHERE name = 'Motorista')),
  ('Lucas Oliveira', (SELECT id FROM main.staff_position WHERE name = 'Fiscal')),
  ('Manuela Pereira', (SELECT id FROM main.staff_position WHERE name = 'Fiscal')),
  ('Enzo Rodrigues', (SELECT id FROM main.staff_position WHERE name = 'Supervisor')),
  ('Valentina Carvalho', (SELECT id FROM main.staff_position WHERE name = 'Supervisor'));

INSERT INTO main.staff_vehicle (vehicle_id, staff_id, shift_start, shift_finish) VALUES
  ((SELECT id FROM main.vehicle WHERE manufacturer = 'ABC Motors' AND model = 'Modelo X'), (SELECT id FROM main.staff WHERE name = 'Sofia Martins'), '2023-07-04 08:00:00'::TIMESTAMP, '2023-07-04 16:00:00'::TIMESTAMP),
  ((SELECT id FROM main.vehicle WHERE manufacturer = 'XYZ Motors' AND model = 'Modelo Y'), (SELECT id FROM main.staff WHERE name = 'Gabriel Silva'), '2023-07-04 09:00:00'::TIMESTAMP, '2023-07-04 17:00:00'::TIMESTAMP),
  ((SELECT id FROM main.vehicle WHERE manufacturer = '123 Railways' AND model = 'Modelo A'), (SELECT id FROM main.staff WHERE name = 'Laura Costa'), '2023-07-04 10:00:00'::TIMESTAMP, '2023-07-04 18:00:00'::TIMESTAMP),
  ((SELECT id FROM main.vehicle WHERE manufacturer = '456 Railways' AND model = 'Modelo B'), (SELECT id FROM main.staff WHERE name = 'Matheus Almeida'), '2023-07-04 11:00:00'::TIMESTAMP, '2023-07-04 19:00:00'::TIMESTAMP),
  ((SELECT id FROM main.vehicle WHERE manufacturer = 'MetroWave' AND model = 'Modelo M'), (SELECT id FROM main.staff WHERE name = 'Isabella Santos'), '2023-07-04 12:00:00'::TIMESTAMP, '2023-07-04 20:00:00'::TIMESTAMP);

INSERT INTO main.ticket (price) VALUES
  ( 10.50),
  ( 5.25),
  ( 21.00),
  ( 42.00),
  ( 12.50);

INSERT INTO main.payment (ticket_id, method, passenger_id) VALUES
  ((SELECT id FROM main.ticket WHERE price = 10.50), 'Cartão de Crédito', (SELECT id FROM main.passenger WHERE name = 'João Silva')),
  ((SELECT id FROM main.ticket WHERE price = 5.25), 'Dinheiro', (SELECT id FROM main.passenger WHERE name = 'Maria Santos')),
  ((SELECT id FROM main.ticket WHERE price = 42.00), 'Cartão de Débito', (SELECT id FROM main.passenger WHERE name = 'Pedro Oliveira')),
  ((SELECT id FROM main.ticket WHERE price = 21.00), 'Cartão de Crédito', (SELECT id FROM main.passenger WHERE name = 'Ana Pereira')),
  ((SELECT id FROM main.ticket WHERE price = 12.50), 'Dinheiro', (SELECT id FROM main.passenger WHERE name = 'Carlos Souza'));
