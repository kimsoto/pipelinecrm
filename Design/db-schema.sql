CREATE SCHEMA `pipeline_crm` ;

CREATE TABLE `pipeline_crm`.`team` (
  `team_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NULL,
  PRIMARY KEY (`team_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);

CREATE TABLE `pipeline_crm`.`member` (
  `member_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  `email` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE `pipeline_crm`.`assigned` (
  `team_id` INT NOT NULL,
  `member_id` INT NOT NULL,
  PRIMARY KEY (`team_id`, `member_id`),
  INDEX `member_id_idx` (`member_id` ASC) VISIBLE,
  CONSTRAINT `team_id2`
    FOREIGN KEY (`team_id`)
    REFERENCES `pipeline_crm`.`team` (`team_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `member_id2`
    FOREIGN KEY (`member_id`)
    REFERENCES `pipeline_crm`.`member` (`member_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE `pipeline_crm`.`status` (
  `status_id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`status_id`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC) VISIBLE);

CREATE TABLE `pipeline_crm`.`client_status` (
  `status_id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`status_id`));

CREATE TABLE `pipeline_crm`.`completion` (
  `completion_id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NOT NULL,
  `value` DECIMAL(5,2) NOT NULL,
  PRIMARY KEY (`completion_id`))
  UNIQUE INDEX `code_UNIQUE` (`code` ASC) VISIBLE;

CREATE TABLE `pipeline_crm`.`client` (
  `client_id` INT NOT NULL AUTO_INCREMENT,
  `status_id` INT NOT NULL,
  `name` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`client_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `status_id_idx` (`status_id` ASC) VISIBLE,
  CONSTRAINT `status_id`
    FOREIGN KEY (`status_id`)
    REFERENCES `pipeline_crm`.`client_status` (`status_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE `pipeline_crm`.`contact` (
  `contact_id` INT NOT NULL AUTO_INCREMENT,
  `client_id` INT NOT NULL,
  `name` VARCHAR(64) NOT NULL,
  `title` VARCHAR(64) NOT NULL,
  `email` VARCHAR(64) NULL,
  `phone` VARCHAR(13) NULL,
  `address` VARCHAR(128) NULL,
  PRIMARY KEY (`contact_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `client_id_idx` (`client_id` ASC) VISIBLE,
  CONSTRAINT `client_id`
    FOREIGN KEY (`client_id`)
    REFERENCES `pipeline_crm`.`client` (`client_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE `pipeline_crm`.`client_note` (
  `note_id` INT NOT NULL AUTO_INCREMENT,
  `client_id` INT NOT NULL,
  `member_id` INT NOT NULL,
  `created_on` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `value` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`note_id`),
  INDEX `member_id_idx` (`member_id` ASC) VISIBLE,
  INDEX `client_id_idx` (`client_id` ASC) VISIBLE,
  CONSTRAINT `client_id2`
    FOREIGN KEY (`client_id`)
    REFERENCES `pipeline_crm`.`client` (`client_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `member_id`
    FOREIGN KEY (`member_id`)
    REFERENCES `pipeline_crm`.`member` (`member_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE `pipeline_crm`.`pipeline` (
  `pipeline_id` INT NOT NULL AUTO_INCREMENT,
  `team_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `name` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`pipeline_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `team_id_idx` (`team_id` ASC) VISIBLE,
  INDEX `product_id_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `team_id3`
    FOREIGN KEY (`team_id`)
    REFERENCES `pipeline_crm`.`team` (`team_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `pipeline_crm`.`product` (`product_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

CREATE TABLE `pipeline_crm`.`product` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  `price` DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (`product_id`);

CREATE TABLE `pipeline_crm`.`item` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `completion_id` INT NOT NULL,
  `status_id` INT NOT NULL,
  `client_id` INT NOT NULL,
  `pipeline_id` INT NOT NULL,
  `title` VARCHAR(64) NOT NULL,
  `contracted_rev` DECIMAL(15,2) NOT NULL,
  `planned_start` DATE NULL,
  `planned_end` DATE NULL,
  `actual_start` DATE NULL,
  `actual_end` DATE NULL,
  PRIMARY KEY (`item_id`),
  INDEX `pipeline_id_idx` (`pipeline_id` ASC) VISIBLE,
  INDEX `client_id_idx` (`client_id` ASC) VISIBLE,
  INDEX `status_id_idx` (`status_id` ASC) VISIBLE,
  INDEX `completion_id_idx` (`completion_id` ASC) VISIBLE,
  CONSTRAINT `completion_id2`
    FOREIGN KEY (`completion_id`)
    REFERENCES `pipeline_crm`.`completion` (`completion_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `status_id3`
    FOREIGN KEY (`status_id`)
    REFERENCES `pipeline_crm`.`status` (`status_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `client_id3`
    FOREIGN KEY (`client_id`)
    REFERENCES `pipeline_crm`.`client` (`client_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `pipeline_id2`
    FOREIGN KEY (`pipeline_id`)
    REFERENCES `pipeline_crm`.`pipeline` (`pipeline_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE `pipeline_crm`.`invoice_item` (
  `invoice_item_id` INT NOT NULL AUTO_INCREMENT,
  `item_id` INT NOT NULL,
  `amount` DECIMAL(15,2) NOT NULL,
  `description` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`invoice_item_id`),
  INDEX `item_id_idx` (`item_id` ASC) VISIBLE,
  INDEX `invoice_id_idx` (`invoice_id` ASC) VISIBLE,
  CONSTRAINT `item_id`
    FOREIGN KEY (`item_id`)
    REFERENCES `pipeline_crm`.`item` (`item_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE),
  CONSTRAINT `invoice_id`
    FOREIGN KEY (`invoice_id`)
    REFERENCES `pipeline_crm`.`invoice` (`invoice_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE `pipeline_crm`.`invoice` (
  `invoice_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(1000) NOT NULL,
  `invoice_num` INT NOT NULL,
  `bill_date` DATE NOT NULL,
  `due_date` DATE NOT NULL,
  PRIMARY KEY (`invoice_id`);

CREATE TABLE `pipeline_crm`.`receipt` (
  `receipt_id` INT NOT NULL AUTO_INCREMENT,
  `invoice_id` INT NOT NULL,
  `received_date` DATE NOT NULL,
  `amount` DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (`receipt_id`),
  INDEX `invoice_id_idx` (`invoice_id` ASC) VISIBLE,
  CONSTRAINT `invoice_id2`
    FOREIGN KEY (`invoice_id`)
    REFERENCES `pipeline_crm`.`invoice` (`invoice_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

INSERT INTO `pipeline_crm`.`status`(`code`) 
VALUES
  ("Backlog"),
  ("In Progress"),
  ("Waiting"),
  ("Cancelled"),
  ("Waiting"),
  ("Complete");

INSERT INTO `pipeline_crm`.`client_status`(`code`) 
VALUES
  ("Active"),
  ("Dormant");

INSERT INTO `pipeline_crm`.`completion`(`code`, `value`) 
VALUES
  ("NEW", 0.0),
  ("1/4", 0.25),
  ("1/2", 0.5),
  ("3/4", 0.75),
  ("DONE", 1.0);