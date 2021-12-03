CREATE TABLE `login_information` (
  `username` varchar(45) NOT NULL,
  `employee_id` char(36) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_manager` tinyint NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `employee_id_UNIQUE` (`employee_id`),
  CONSTRAINT `login_information_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
