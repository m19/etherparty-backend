CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(200) NOT NULL DEFAULT '',
  `password` varchar(64) NOT NULL DEFAULT '',
  `plan_type` varchar(11) NOT NULL DEFAULT 'free',
  `plan_expiry` date DEFAULT NULL,
  `activation_token` varchar(32) DEFAULT NULL,
  `activated` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;