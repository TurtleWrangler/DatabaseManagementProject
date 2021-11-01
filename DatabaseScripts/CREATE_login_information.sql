CREATE TABLE 'login-information'(
    'username' varchar(20) NOT NULL,
    'eId'char(36) NOT NULL,
    'password' varchar(255) NOT NULL,
    'isManager' boolean NOT NULL,
    PRIMARY KEY ('eId'),
    UNIQUE KEY 'username_UNIQUE' ('username')
    
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
