-- given user id, return list of team ids
-- given team id, return list of pokemon

DROP PROCEDURE IF EXISTS team_id_to_pokemon;

DELIMITER //
CREATE PROCEDURE team_id_to_pokemon (
    IN team_id_p INT)
    BEGIN
		SELECT species FROM pokemon WHERE team_id = team_id_p;
    END //
DELIMITER ;

call team_id_to_pokemon(1);
-- call user_to_team_ids(2);