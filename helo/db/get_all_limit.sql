SELECT * FROM helo_users
WHERE id != $1
LIMIT $3 OFFSET $2