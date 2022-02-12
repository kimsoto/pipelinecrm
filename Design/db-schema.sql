CREATE SCHEMA pipeline_crm ;

CREATE TABLE team (
  team_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(64) NOT NULL,
  CONSTRAINT name_unique UNIQUE (name));

CREATE TABLE member (
  member_id INT PRIMARY KEY AUTO_INCREMENT,
  team_id INT NOT NULL,
  name VARCHAR(64) NOT NULL,
  email VARCHAR(64) NOT NULL,
  CONSTRAINT email_unique UNIQUE (email),
  CONSTRAINT team_id
    FOREIGN KEY (team_id)
    REFERENCES team (team_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE assigned (
  team_id INT NOT NULL,
  member_id INT NOT NULL,
  PRIMARY KEY (team_id, member_id),
  CONSTRAINT team_id2
    FOREIGN KEY (team_id)
    REFERENCES team (team_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT member_id2
    FOREIGN KEY (member_id)
    REFERENCES member (member_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE status (
  status_id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(64) NOT NULL,
  CONSTRAINT code_unique UNIQUE (code));

CREATE TABLE client_status (
  status_id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(64) NOT NULL);

CREATE TABLE completion (
  completion_id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(30) NOT NULL,
  value DECIMAL(5,2) NOT NULL,
  CONSTRAINT code_unique UNIQUE (code));

CREATE TABLE client (
  client_id INT PRIMARY KEY AUTO_INCREMENT,
  status_id INT NOT NULL,
  name VARCHAR(64) NOT NULL,
  CONSTRAINT name_unique UNIQUE (name),
  CONSTRAINT status_id
    FOREIGN KEY (status_id)
    REFERENCES client_status (status_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE contact (
  contact_id INT PRIMARY KEY AUTO_INCREMENT,
  client_id INT NOT NULL,
  name VARCHAR(64) NOT NULL,
  title VARCHAR(64) NOT NULL,
  email VARCHAR(64) NULL,
  phone VARCHAR(13) NULL,
  address VARCHAR(128) NULL,
  CONSTRAINT email_unique UNIQUE (email),
  CONSTRAINT client_id
    FOREIGN KEY (client_id)
    REFERENCES client (client_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE client_note (
  note_id INT PRIMARY KEY AUTO_INCREMENT,
  client_id INT NOT NULL,
  member_id INT NOT NULL,
  created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  value VARCHAR(1000) NOT NULL,
  CONSTRAINT client_id2
    FOREIGN KEY (client_id)
    REFERENCES client (client_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT member_id
    FOREIGN KEY (member_id)
    REFERENCES member (member_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE pipeline (
  pipeline_id INT PRIMARY KEY AUTO_INCREMENT,
  team_id INT NOT NULL,
  name VARCHAR(64) NOT NULL,
  CONSTRAINT name_unique UNIQUE (name),
  CONSTRAINT team_id3
    FOREIGN KEY (team_id)
    REFERENCES team (team_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE product (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  pipeline_id INT NOT NULL,
  name VARCHAR(64) NOT NULL,
  price DECIMAL(15,2) NOT NULL,
  CONSTRAINT name_unique UNIQUE (name),
  CONSTRAINT pipeline_id
    FOREIGN KEY (pipeline_id)
    REFERENCES pipeline (pipeline_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE item (
  item_id INT PRIMARY KEY AUTO_INCREMENT,
  completion_id INT NOT NULL,
  status_id INT NOT NULL,
  client_id INT NOT NULL,
  product_id INT NOT NULL,
  title VARCHAR(64) NOT NULL,
  contracted_rev DECIMAL(15,2) NOT NULL,
  planned_start DATE NULL,
  planned_end DATE NULL,
  actual_start DATE NULL,
  actual_end DATE NULL,
  CONSTRAINT completion_id
    FOREIGN KEY (completion_id)
    REFERENCES completion (completion_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT status_id2
    FOREIGN KEY (status_id)
    REFERENCES status (status_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT client_id3
    FOREIGN KEY (client_id)
    REFERENCES client (client_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT product_id
    FOREIGN KEY (product_id)
    REFERENCES product (product_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE invoice (
  invoice_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(1000) NOT NULL,
  invoice_num INT NOT NULL,
  bill_date DATE NOT NULL,
  due_date DATE NOT NULL);

CREATE TABLE invoice_item (
  invoice_item_id INT PRIMARY KEY AUTO_INCREMENT,
  invoice_id INT NOT NULL,
  item_id INT NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  CONSTRAINT item_id
    FOREIGN KEY (item_id)
    REFERENCES item (item_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT invoice_id
    FOREIGN KEY (invoice_id)
    REFERENCES invoice (invoice_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE receipt (
  receipt_id INT PRIMARY KEY AUTO_INCREMENT,
  invoice_id INT NOT NULL,
  received_date DATE NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  CONSTRAINT invoice_id2
    FOREIGN KEY (invoice_id)
    REFERENCES invoice (invoice_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

INSERT INTO status(code) 
VALUES
  ("Backlog"),
  ("In Progress"),
  ("Waiting"),
  ("Cancelled"),
  ("Billed"),
  ("Complete");

INSERT INTO client_status(code) 
VALUES
  ("Active"),
  ("Dormant"),
  ("Potential");

INSERT INTO completion(code, value) 
VALUES
  ("New", 0.0),
  ("1/4", 0.25),
  ("1/2", 0.5),
  ("3/4", 0.75),
  ("Done", 1.0);
