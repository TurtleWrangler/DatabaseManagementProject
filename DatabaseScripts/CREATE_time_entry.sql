CREATE TABLE `time_entry` (
  `employee_id` char(36) NOT NULL,
  `date` date NOT NULL,
  `hours_worked` decimal(4,2) NOT NULL,
  `comments` text,
  `week_start_date` date NOT NULL,
  `submission_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`employee_id`,`date`),
  KEY `week_start_date_idx` (`week_start_date`),
  CONSTRAINT `time_entry_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `week_start_date` FOREIGN KEY (`week_start_date`) REFERENCES `timesheet` (`week_start_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
