CREATE TABLE `employee` (
  `id` char(36) NOT NULL,
  `dept_id` char(36) NOT NULL,
  `name_first` varchar(20) NOT NULL,
  `name_last` varchar(20) NOT NULL,
  `occupation` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `address` varchar(50) NOT NULL,
  `phone_number` char(10) NOT NULL,
  `date_of_birth` date NOT NULL,
  `date_of_hire` date NOT NULL,
  `date_of_dismissal` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dept_id_idx` (`dept_id`),
  CONSTRAINT `dept_id` FOREIGN KEY (`dept_id`) REFERENCES `department` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
