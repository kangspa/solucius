CREATE TABLE `user` (
  `user_idx` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `user_pw` varchar(300),
  `user_nm` varchar(50),
  `user_email` varchar(50),
  `create_dt` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_dt` datetime,
  PRIMARY KEY (`user_idx`)
);

CREATE TABLE `qna_detail` (
  `qna_detail_idx` int NOT NULL AUTO_INCREMENT,
  `qna_idx` int NOT NULL,
  `contents` text,
  `create_dt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`qna_detail_idx`),
  KEY `qnaIdx` (`qna_idx`),
  CONSTRAINT `qnadetail_ibfk_1` FOREIGN KEY (`qna_idx`) REFERENCES `qna` (`qna_idx`)
);

CREATE TABLE `qna` (
  `qna_idx` int NOT NULL AUTO_INCREMENT,
  `user_idx` int NOT NULL,
  `ask_field` varchar(100),
  `scrap` tinyint(1),
  `end_dt` datetime,
  `create_dt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`qna_idx`),
  KEY `userIdx` (`user_idx`),
  CONSTRAINT `qna_ibfk_1` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`)
);

CREATE TABLE `new_qna` (
  `new_qna_idx` int NOT NULL AUTO_INCREMENT,
  `qna_idx` int NOT NULL,
  `contents` text,
  `create_dt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`new_qna_idx`),
  KEY `qnaIdx` (`qna_idx`),
  CONSTRAINT `newqna_ibfk_1` FOREIGN KEY (`qna_idx`) REFERENCES `qna` (`qna_idx`)
);

CREATE TABLE `memo` (
  `memoIdx` int NOT NULL AUTO_INCREMENT,
  `qnaIdx` int NOT NULL,
  `contents` text,
  PRIMARY KEY (`memoIdx`),
  KEY `qnaIdx` (`qnaIdx`),
  CONSTRAINT `memo_ibfk_1` FOREIGN KEY (`qnaIdx`) REFERENCES `qna` (`qna_idx`)
);

create table img(
	img_idx int not null auto_increment primary key,
	qna_idx int not null,
	img_url varchar(300),
	img_name varchar(500),
	img_size long,
	content_type VARCHAR(100),
	create_dt datetime,
	FOREIGN KEY (`qna_idx`) REFERENCES qna(qna_idx)
);