CREATE TABLE `timesheet` (
  `week_start_date` date NOT NULL,
  `employee_id` char(36) NOT NULL,
  `timesheet_approved` tinyint NOT NULL,
  PRIMARY KEY (`week_start_date`,`employee_id`),
  KEY `employee_id_idx` (`employee_id`),
  CONSTRAINT `employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci