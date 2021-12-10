-- given user id, return list of team ids
-- given team id, return list of pokemon

DROP PROCEDURE IF EXISTS user_to_team_ids;

DELIMITER //
CREATE PROCEDURE user_to_team_ids (
    IN user_id INT)
    BEGIN
		SELECT team_id FROM team WHERE member_id = user_id;
    END //
DELIMITER ;

call user_to_team_ids(1);
call user_to_team_ids(2);