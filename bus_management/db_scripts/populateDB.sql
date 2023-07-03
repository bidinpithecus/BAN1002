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
  ('Rota A', (SELECT id FROM main.location WHERE address = 'Rua A, 123'), (SELECT id FROM main.location WHERE address = 'Terminal Central'), 10),
  ('Rota B', (SELECT id FROM main.location WHERE address = 'Estação Norte'), (SELECT id FROM main.location WHERE address = 'Estação Sul'), 20),
  ('Rota C', (SELECT id FROM main.location WHERE address = 'Estação Leste'), (SELECT id FROM main.location WHERE address = 'Estação Oeste'), 15),
  ('Rota D', (SELECT id FROM main.location WHERE address = 'Estação 1'), (SELECT id FROM main.location WHERE address = 'Estação 2'), 5),
  ('Rota E', (SELECT id FROM main.location WHERE address = 'Estação 2'), (SELECT id FROM main.location WHERE address = 'Estação 3'), 8);
  ('Rota F', (SELECT id FROM main.location WHERE address = 'Terminal Central'), (SELECT id FROM main.location WHERE address = 'Terminal Norte'), 18),

INSERT INTO main.vehicle (category_id, manufacturer, model, year, capacity) VALUES
  ((SELECT id FROM main.transport_category WHERE name = 'Ônibus'), 'ABC Motors', 'Modelo X', 2022, 50),
  ((SELECT id FROM main.transport_category WHERE name = 'Ônibus'), 'XYZ Motors', 'Modelo Y', 2023, 40),
  ((SELECT id FROM main.transport_category WHERE name = 'Trem'), '123 Railways', 'Modelo A', 2022, 200),
  ((SELECT id FROM main.transport_category WHERE name = 'Trem'), '456 Railways', 'Modelo B', 2021, 150),
  ((SELECT id FROM main.transport_category WHERE name = 'Metrô'), 'MetroWave', 'Modelo M', 2023, 300);

INSERT INTO main.vehicle_route (vehicle_id, route_id, time_init, time_end) VALUES
  ((SELECT id FROM main.vehicle WHERE manufacturer = 'ABC Motors'), (SELECT id FROM main.route WHERE name = 'Rota A'), '08:00:00', '09:00:00'),
  ((SELECT id FROM main.vehicle WHERE manufacturer = 'ABC Motors'), (SELECT id FROM main.route WHERE name = 'Rota B'), '10:00:00', '11:00:00'),
  ((SELECT id FROM main.vehicle WHERE manufacturer = 'XYZ Motors'), (SELECT id FROM main.route WHERE name = 'Rota C'), '13:00:00', '14:00:00'),
  ((SELECT id FROM main.vehicle WHERE manufacturer = '123 Railways'), (SELECT id FROM main.route WHERE name = 'Rota D'), '15:00:00', '15:30:00'),
  ((SELECT id FROM main.vehicle WHERE manufacturer = 'MetroWave'), (SELECT id FROM main.route WHERE name = 'Rota E'), '18:00:00', '18:30:00');

INSERT INTO main.passenger (name, email, phone) VALUES
  ('João Silva', 'joao@example.com', '1234567890'),
  ('Maria Santos', 'maria@example.com', '9876543210'),
  ('Pedro Oliveira', 'pedro@example.com', '4567891230'),
  ('Ana Pereira', 'ana@example.com', '3216549870'),
  ('Carlos Souza', 'carlos@example.com', '9873216540');

INSERT INTO main.transportation (date, passenger_id, vehicle_id) VALUES
  ('2023-06-01', (SELECT id FROM main.passenger WHERE name = 'João Silva'), (SELECT id FROM main.vehicle WHERE manufacturer = 'ABC Motors')),
  ('2023-06-02', (SELECT id FROM main.passenger WHERE name = 'Maria Santos'), (SELECT id FROM main.vehicle WHERE manufacturer = 'ABC Motors')),
  ('2023-06-03', (SELECT id FROM main.passenger WHERE name = 'Pedro Oliveira'), (SELECT id FROM main.vehicle WHERE manufacturer = 'XYZ Motors')),
  ('2023-06-04', (SELECT id FROM main.passenger WHERE name = 'Ana Pereira'), (SELECT id FROM main.vehicle WHERE manufacturer = '123 Railways')),
  ('2023-06-05', (SELECT id FROM main.passenger WHERE name = 'Carlos Souza'), (SELECT id FROM main.vehicle WHERE manufacturer = 'MetroWave'));

INSERT INTO main.feedback (passenger_id, comment, rating) VALUES
  ((SELECT id FROM main.passenger WHERE name = 'João Silva'), 'Ótimo serviço!', 5),
  ((SELECT id FROM main.passenger WHERE name = 'Maria Santos'), 'Motorista educado.', 4),
  ((SELECT id FROM main.passenger WHERE name = 'Pedro Oliveira'), 'Atraso no horário.', 3),
  ((SELECT id FROM main.passenger WHERE name = 'Ana Pereira'), 'Trem lotado.', 2);
