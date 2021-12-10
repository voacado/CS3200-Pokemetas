DROP PROCEDURE IF EXISTS calculate_weaknesses;

DELIMITER //
CREATE PROCEDURE calculate_weaknesses (
    IN type1 VARCHAR(10), 
    IN type2 VARCHAR(10))
    BEGIN
		IF type2 IS NOT NULL THEN
			SELECT t1.type_attack, t1.effect * t2.effect AS 'effect' FROM
			(SELECT * FROM type_effectiveness WHERE type_defense LIKE type1) t1
            JOIN
            (SELECT * FROM type_effectiveness WHERE type_defense LIKE type2) t2
            ON t1.type_attack = t2.type_attack;
		ELSE
			SELECT type_attack, effect FROM type_effectiveness WHERE type_defense LIKE type1;
		END IF;
    END //
DELIMITER ;

call calculate_weaknesses ("fire", "flying");
call calculate_weaknesses ("fire", null);