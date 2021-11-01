CREATE TABLE 'time_entry'(
    'entryId' char(36) NOT NULL,
    'employee_id' char(36) NOT NULL,
    'numHours' int,
    'date' DATE NOT NULL,
    'timeSubmitted' TIMESTAMP NOT NULL,
    'comments' TEXT,
    'hoursApproved' tinyint NOT NULL,
    PRIMARY KEY ('entryId'),
    UNIQUE KEY 'entryId_UNIQUE'('entryId')
    CONSTRAINT 'employee_id' FOREIGN KEY ('employee_id') REFERENCES 'employee'('id')
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci