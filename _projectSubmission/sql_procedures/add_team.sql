DROP PROCEDURE IF EXISTS add_team;
 
DELIMITER //
CREATE PROCEDURE add_team(
	IN team_name_p VARCHAR(100),
    IN team_desc_p VARCHAR(100),
    IN member_id_p INT,
    IN poke_1_p VARCHAR(50),
    IN poke_2_p VARCHAR(50),
    IN poke_3_p VARCHAR(50),
    IN poke_4_p VARCHAR(50),
    IN poke_5_p VARCHAR(50),
    IN poke_6_p VARCHAR(50))
	BEGIN
		-- Insert team info into table "team"
		INSERT INTO team (team_id, team_name, description, likes, dislikes, member_id)
		VALUES
		(NULL, team_name_p, team_desc_p, 0, 0, member_id_p);
        
        -- Insert team pokemon into table "pokemon"
        IF poke_1_p IS NULL THEN
			SELECT 'no pokemon in team included' AS WARNING_MESSAGE;
		ELSEIF poke_2_p is NULL THEN
			INSERT INTO pokemon (poke_id, species, team_id)
            VALUES
            (NULL, poke_1_p, LAST_INSERT_ID());
		ELSEIF poke_3_p is NULL THEN
			INSERT INTO pokemon (poke_id, species, team_id)
            VALUES
            (NULL, poke_1_p, LAST_INSERT_ID()),
            (NULL, poke_2_p, LAST_INSERT_ID());
		ELSEIF poke_4_p is NULL THEN
			INSERT INTO pokemon (poke_id, species, team_id)
            VALUES
            (NULL, poke_1_p, LAST_INSERT_ID()),
            (NULL, poke_2_p, LAST_INSERT_ID()),
            (NULL, poke_3_p, LAST_INSERT_ID());
		ELSEIF poke_5_p is NULL THEN
			INSERT INTO pokemon (poke_id, species, team_id)
            VALUES
            (NULL, poke_1_p, LAST_INSERT_ID()),
            (NULL, poke_2_p, LAST_INSERT_ID()),
            (NULL, poke_3_p, LAST_INSERT_ID()),
            (NULL, poke_4_p, LAST_INSERT_ID());
		ELSEIF poke_6_p is NULL THEN
			INSERT INTO pokemon (poke_id, species, team_id)
            VALUES
            (NULL, poke_1_p, LAST_INSERT_ID()),
            (NULL, poke_2_p, LAST_INSERT_ID()),
            (NULL, poke_3_p, LAST_INSERT_ID()),
            (NULL, poke_4_p, LAST_INSERT_ID()),
            (NULL, poke_5_p, LAST_INSERT_ID());
		ELSE
			INSERT INTO pokemon (poke_id, species, team_id)
            VALUES
            (NULL, poke_1_p, LAST_INSERT_ID()),
            (NULL, poke_2_p, LAST_INSERT_ID()),
            (NULL, poke_3_p, LAST_INSERT_ID()),
            (NULL, poke_4_p, LAST_INSERT_ID()),
            (NULL, poke_5_p, LAST_INSERT_ID()),
            (NULL, poke_6_p, LAST_INSERT_ID());
		END IF;
        
        SELECT 'user sucessfully inserted' AS MESSAGE;
    END //
DELIMITER ;

call add_team("name1", "desc1", 2, "Charizard", "Squirtle", "Ivysaur", null, null, null);
