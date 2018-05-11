DELETE FROM helo_friends
WHERE user_id = $1 AND friend_id = $2
RETURNING *;