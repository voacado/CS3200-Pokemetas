DROP PROCEDURE IF EXISTS delete_team;
 
DELIMITER //
CREATE PROCEDURE delete_team(
	IN team_id_p INT)
	BEGIN
		DECLARE team_exists BOOLEAN;
        DECLARE pokemon_exists BOOLEAN;
        
        SELECT EXISTS(SELECT * FROM team WHERE team_id = team_id_p) INTO team_exists;
        SELECT EXISTS(SELECT * FROM pokemon WHERE team_id = team_id_p) INTO pokemon_exists;
        
        IF team_exists = TRUE THEN
			DELETE FROM team WHERE team_id = team_id_p;
		ELSE
			SELECT 'Team does not exist' AS MESSAGE;
		END IF;
            
		IF pokemon_exists = TRUE THEN
			DELETE FROM pokemon WHERE team_id = team_id_p;
		ELSE
			SELECT 'Pokemon for team does not exist' AS MESSAGE;
		END IF;
    END //
DELIMITER ;

call delete_team(4);