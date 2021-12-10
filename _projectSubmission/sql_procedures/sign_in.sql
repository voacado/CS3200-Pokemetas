USE u998006431_Pokemon;

DROP FUNCTION IF EXISTS `sign_in`;

DELIMITER //
CREATE FUNCTION `sign_in` (member_id_p INT, password_p VARCHAR(50))
	RETURNS BOOLEAN
    DETERMINISTIC
    READS SQL DATA
    BEGIN
	DECLARE ret_val BOOLEAN;
    
    IF (EXISTS(SELECT * FROM member WHERE member_id = member_id_p AND password LIKE PASSWORD(password_p)))
		THEN SET ret_val = 1;
	ELSE 
		SET ret_val = 0;
	END IF;
    
    RETURN ret_val;
    
	END //
DELIMITER ;

SELECT sign_in(1, 'password');
