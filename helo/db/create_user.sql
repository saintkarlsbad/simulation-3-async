INSERT INTO helo_users
(auth_id, first, last, img)
VALUES
($1, $2, $3, $4);
SELECT * from helo_users
WHERE auth_id = $1