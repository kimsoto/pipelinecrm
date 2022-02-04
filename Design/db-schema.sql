CREATE SCHEMA `pipeline-crm` ;

CREATE TABLE `pipeline-crm`.`team` (
  `teamID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`teamID`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);

CREATE TABLE `pipeline-crm`.`member` (
  `memberID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  `email` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`memberID`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE `pipeline-crm`.`assigned` (
  `teamID` INT NOT NULL,
  `memberID` INT NOT NULL,
  PRIMARY KEY (`teamID`, `memberID`),
  INDEX `memberID_idx` (`memberID` ASC) VISIBLE,
  CONSTRAINT `teamID2`
    FOREIGN KEY (`teamID`)
    REFERENCES `pipeline-crm`.`team` (`teamID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `memberID2`
    FOREIGN KEY (`memberID`)
    REFERENCES `pipeline-crm`.`member` (`memberID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

CREATE TABLE `pipeline-crm`.`status` (
  `statusID` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`statusID`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC) VISIBLE);

CREATE TABLE `pipeline-crm`.`clientStatus` (
  `statusID` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`statusID`));

CREATE TABLE `pipeline-crm`.`completion` (
  `completionID` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NOT NULL,
  `value` DECIMAL(5,2) NOT NULL,
  PRIMARY KEY (`completionID`))
  UNIQUE INDEX `code_UNIQUE` (`code` ASC) VISIBLE;

CREATE TABLE `pipeline-crm`.`client` (
  `clientID` INT NOT NULL AUTO_INCREMENT,
  `statusID` INT NOT NULL,
  `name` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`clientID`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `statusID_idx` (`statusID` ASC) VISIBLE,
  CONSTRAINT `statusID`
    FOREIGN KEY (`statusID`)
    REFERENCES `pipeline-crm`.`clientStatus` (`statusID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

CREATE TABLE `pipeline-crm`.`contact` (
  `contactID` INT NOT NULL AUTO_INCREMENT,
  `clientID` INT NOT NULL,
  `name` VARCHAR(64) NOT NULL,
  `title` VARCHAR(64) NOT NULL,
  `email` VARCHAR(64) NULL,
  `phone` VARCHAR(13) NULL,
  `address` VARCHAR(128) NULL,
  PRIMARY KEY (`contactID`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `clientID_idx` (`clientID` ASC) VISIBLE,
  CONSTRAINT `clientID`
    FOREIGN KEY (`clientID`)
    REFERENCES `pipeline-crm`.`client` (`clientID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

CREATE TABLE `pipeline-crm`.`clientNote` (
  `noteID` INT NOT NULL AUTO_INCREMENT,
  `clientID` INT NOT NULL,
  `memberID` INT NOT NULL,
  `createdOn` CURRENT_TIMESTAMP NOT NULL,
  `value` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`noteID`),
  INDEX `memberID_idx` (`memberID` ASC) VISIBLE,
  INDEX `clientID_idx` (`clientID` ASC) VISIBLE,
  CONSTRAINT `clientID2`
    FOREIGN KEY (`clientID`)
    REFERENCES `pipeline-crm`.`client` (`clientID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `memberID`
    FOREIGN KEY (`memberID`)
    REFERENCES `pipeline-crm`.`member` (`memberID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

CREATE TABLE `pipeline-crm`.`pipeline` (
  `pipelineID` INT NOT NULL AUTO_INCREMENT,
  `teamID` INT NOT NULL,
  `name` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`pipelineID`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `teamID_idx` (`teamID` ASC) VISIBLE,
  CONSTRAINT `teamID3`
    FOREIGN KEY (`teamID`)
    REFERENCES `pipeline-crm`.`team` (`teamID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT;

CREATE TABLE `pipeline-crm`.`product` (
  `productID` INT NOT NULL AUTO_INCREMENT,
  `pipelineID` INT NOT NULL,
  `statusID` INT NOT NULL,
  `completionID` INT NOT NULL,
  `name` VARCHAR(64) NOT NULL,
  `price` DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (`productID`),
  INDEX `pipelineID_idx` (`pipelineID` ASC) VISIBLE,
  INDEX `statusID_idx` (`statusID` ASC) VISIBLE,
  INDEX `completionID_idx` (`completionID` ASC) VISIBLE,
  CONSTRAINT `pipelineID`
    FOREIGN KEY (`pipelineID`)
    REFERENCES `pipeline-crm`.`pipeline` (`pipelineID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT),
  CONSTRAINT `statusID2`
    FOREIGN KEY (`statusID`)
    REFERENCES `pipeline-crm`.`status` (`statusID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT),
  CONSTRAINT `completionID`
    FOREIGN KEY (`completionID`)
    REFERENCES `pipeline-crm`.`completion` (`completionID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT;

CREATE TABLE `pipeline-crm`.`item` (
  `itemID` INT NOT NULL AUTO_INCREMENT,
  `completionID` INT NOT NULL,
  `statusID` INT NOT NULL,
  `clientID` INT NOT NULL,
  `pipelineID` INT NOT NULL,
  `title` VARCHAR(64) NOT NULL,
  `contractedRev` DECIMAL(6,2) NOT NULL,
  `plannedStart` DATE NOT NULL,
  `plannedEnd` DATE NOT NULL,
  `actualStart` DATE NOT NULL,
  `actualEnd` DATE NOT NULL,
  PRIMARY KEY (`itemID`),
  INDEX `pipelineID_idx` (`pipelineID` ASC) VISIBLE,
  INDEX `clientID_idx` (`clientID` ASC) VISIBLE,
  INDEX `statusID_idx` (`statusID` ASC) VISIBLE,
  INDEX `completionID_idx` (`completionID` ASC) VISIBLE,
  CONSTRAINT `completionID2`
    FOREIGN KEY (`completionID`)
    REFERENCES `pipeline-crm`.`completion` (`completionID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `statusID3`
    FOREIGN KEY (`statusID`)
    REFERENCES `pipeline-crm`.`status` (`statusID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `clientID3`
    FOREIGN KEY (`clientID`)
    REFERENCES `pipeline-crm`.`client` (`clientID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `pipelineID2`
    FOREIGN KEY (`pipelineID`)
    REFERENCES `pipeline-crm`.`pipeline` (`pipelineID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

CREATE TABLE `pipeline-crm`.`invoiceItem` (
  `invoiceItemID` INT NOT NULL AUTO_INCREMENT,
  `itemID` INT NOT NULL,
  `createdOn` DATE NOT NULL,
  `value` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`invoiceItemID`),
  INDEX `itemID_idx` (`itemID` ASC) VISIBLE,
  CONSTRAINT `itemID`
    FOREIGN KEY (`itemID`)
    REFERENCES `pipeline-crm`.`item` (`itemID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

CREATE TABLE `pipeline-crm`.`invoice` (
  `invoiceID` INT NOT NULL AUTO_INCREMENT,
  `invoiceItemID` INT NOT NULL,
  `name` VARCHAR(1000) NOT NULL,
  `invoiceNum` INT NOT NULL,
  `billDate` DATE NOT NULL,
  `dueDate` DATE NOT NULL,
  PRIMARY KEY (`invoiceID`),
  INDEX `invoiceItemID_idx` (`invoiceItemID` ASC) VISIBLE,
  CONSTRAINT `invoiceItemID`
    FOREIGN KEY (`invoiceItemID`)
    REFERENCES `pipeline-crm`.`invoiceItem` (`invoiceItemID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

CREATE TABLE `pipeline-crm`.`receipt` (
  `receiptID` INT NOT NULL AUTO_INCREMENT,
  `invoiceID` INT NOT NULL,
  `receivedDate` DATE NOT NULL,
  `amount` DECIMAL(6,2) NOT NULL,
  PRIMARY KEY (`receiptID`),
  INDEX `invoiceID_idx` (`invoiceID` ASC) VISIBLE,
  CONSTRAINT `invoiceID`
    FOREIGN KEY (`invoiceID`)
    REFERENCES `pipeline-crm`.`invoice` (`invoiceID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);