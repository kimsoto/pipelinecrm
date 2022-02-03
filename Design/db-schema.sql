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
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `memberID2`
    FOREIGN KEY (`memberID`)
    REFERENCES `pipeline-crm`.`member` (`memberID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `pipeline-crm`.`status` (
  `statusID` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(64) NULL,
  PRIMARY KEY (`statusID`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC) VISIBLE);

CREATE TABLE `pipeline-crm`.`clientStatus` (
  `statusID` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(64) NULL,
  PRIMARY KEY (`statusID`));

CREATE TABLE `pipeline-crm`.`completion` (
  `completionID` INT NOT NULL AUTO_INCREMENT,
  `code` DECIMAL(5,2) NULL,
  PRIMARY KEY (`completionID`));

CREATE TABLE `pipeline-crm`.`client` (
  `clientID` INT NOT NULL AUTO_INCREMENT,
  `statusID` INT NULL,
  `teamID` INT NULL,
  `name` VARCHAR(64) NULL,
  PRIMARY KEY (`clientID`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `statusID_idx` (`statusID` ASC) VISIBLE,
  INDEX `teamID_idx` (`teamID` ASC) VISIBLE,
  CONSTRAINT `teamID`
    FOREIGN KEY (`teamID`)
    REFERENCES `pipeline-crm`.`team` (`teamID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `statusID`
    FOREIGN KEY (`statusID`)
    REFERENCES `pipeline-crm`.`clientStatus` (`statusID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `pipeline-crm`.`contact` (
  `contactID` INT NOT NULL AUTO_INCREMENT,
  `clientID` INT NULL,
  `name` VARCHAR(64) NULL,
  `title` VARCHAR(64) NULL,
  `email` VARCHAR(64) NULL,
  `phone` VARCHAR(13) NULL,
  `address` VARCHAR(128) NULL,
  PRIMARY KEY (`contactID`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `clientID_idx` (`clientID` ASC) VISIBLE,
  CONSTRAINT `clientID`
    FOREIGN KEY (`clientID`)
    REFERENCES `pipeline-crm`.`client` (`clientID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `pipeline-crm`.`clientNote` (
  `nodeID` INT NOT NULL AUTO_INCREMENT,
  `clientID` INT NULL,
  `memberID` INT NULL,
  `createdOn` DATETIME NULL,
  `value` VARCHAR(1000) NULL,
  PRIMARY KEY (`nodeID`),
  INDEX `memberID_idx` (`memberID` ASC) VISIBLE,
  INDEX `clientID_idx` (`clientID` ASC) VISIBLE,
  CONSTRAINT `clientID2`
    FOREIGN KEY (`clientID`)
    REFERENCES `pipeline-crm`.`client` (`clientID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `memberID`
    FOREIGN KEY (`memberID`)
    REFERENCES `pipeline-crm`.`member` (`memberID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `pipeline-crm`.`pipeline` (
  `pipelineID` INT NOT NULL AUTO_INCREMENT,
  `teamID` INT NULL,
  `completionID` INT NULL,
  `statusID` INT NULL,
  `name` VARCHAR(64) NULL,
  PRIMARY KEY (`pipelineID`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `statusID_idx` (`statusID` ASC) VISIBLE,
  INDEX `completionID_idx` (`completionID` ASC) VISIBLE,
  INDEX `teamID_idx` (`teamID` ASC) VISIBLE,
  CONSTRAINT `teamID3`
    FOREIGN KEY (`teamID`)
    REFERENCES `pipeline-crm`.`team` (`teamID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `completionID`
    FOREIGN KEY (`completionID`)
    REFERENCES `pipeline-crm`.`completion` (`completionID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `statusID2`
    FOREIGN KEY (`statusID`)
    REFERENCES `pipeline-crm`.`status` (`statusID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `pipeline-crm`.`product` (
  `productID` INT NOT NULL AUTO_INCREMENT,
  `pipelineID` INT NULL,
  `name` VARCHAR(64) NULL,
  `price` DECIMAL(5,2) NULL,
  PRIMARY KEY (`productID`),
  INDEX `pipelineID_idx` (`pipelineID` ASC) VISIBLE,
  CONSTRAINT `pipelineID`
    FOREIGN KEY (`pipelineID`)
    REFERENCES `pipeline-crm`.`pipeline` (`pipelineID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `pipeline-crm`.`item` (
  `itemID` INT NOT NULL AUTO_INCREMENT,
  `completionID` INT NULL,
  `statusID` INT NULL,
  `clientID` INT NULL,
  `pipelineID` INT NULL,
  `title` VARCHAR(64) NULL,
  `contractedRev` DECIMAL(6,2) NULL,
  `plannedStart` DATE NULL,
  `plannedEnd` DATE NULL,
  `actualStart` DATE NULL,
  `actualEnd` DATE NULL,
  PRIMARY KEY (`itemID`),
  INDEX `pipelineID_idx` (`pipelineID` ASC) VISIBLE,
  INDEX `clientID_idx` (`clientID` ASC) VISIBLE,
  INDEX `statusID_idx` (`statusID` ASC) VISIBLE,
  INDEX `completionID_idx` (`completionID` ASC) VISIBLE,
  CONSTRAINT `completionID2`
    FOREIGN KEY (`completionID`)
    REFERENCES `pipeline-crm`.`completion` (`completionID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `statusID3`
    FOREIGN KEY (`statusID`)
    REFERENCES `pipeline-crm`.`status` (`statusID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `clientID3`
    FOREIGN KEY (`clientID`)
    REFERENCES `pipeline-crm`.`client` (`clientID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `pipelineID2`
    FOREIGN KEY (`pipelineID`)
    REFERENCES `pipeline-crm`.`pipeline` (`pipelineID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `pipeline-crm`.`invoiceItem` (
  `invoiceItemID` INT NOT NULL AUTO_INCREMENT,
  `itemID` INT NULL,
  `createdOn` DATE NULL,
  `value` VARCHAR(1000) NULL,
  PRIMARY KEY (`invoiceItemID`),
  INDEX `itemID_idx` (`itemID` ASC) VISIBLE,
  CONSTRAINT `itemID`
    FOREIGN KEY (`itemID`)
    REFERENCES `pipeline-crm`.`item` (`itemID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `pipeline-crm`.`invoice` (
  `invoiceID` INT NOT NULL AUTO_INCREMENT,
  `invoiceItemID` INT NULL,
  `name` VARCHAR(1000) NULL,
  `invoiceNum` INT NULL,
  `billDate` DATE NULL,
  `dueDate` DATE NULL,
  PRIMARY KEY (`invoiceID`),
  INDEX `invoiceItemID_idx` (`invoiceItemID` ASC) VISIBLE,
  CONSTRAINT `invoiceItemID`
    FOREIGN KEY (`invoiceItemID`)
    REFERENCES `pipeline-crm`.`invoiceItem` (`invoiceItemID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `pipeline-crm`.`receipt` (
  `receiptID` INT NOT NULL AUTO_INCREMENT,
  `invoiceID` INT NULL,
  `receivedDate` DATE NULL,
  `amount` DECIMAL(6,2) NULL,
  PRIMARY KEY (`receiptID`),
  INDEX `invoiceID_idx` (`invoiceID` ASC) VISIBLE,
  CONSTRAINT `invoiceID`
    FOREIGN KEY (`invoiceID`)
    REFERENCES `pipeline-crm`.`invoice` (`invoiceID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);