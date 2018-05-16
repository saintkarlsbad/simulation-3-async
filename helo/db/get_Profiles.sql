-- SELECT * FROM helo_users
-- WHERE id != $1 AND id NOT IN (
-- SELECT friend_id FROM helo_friends
-- WHERE user_id = $1)

SELECT helo_users.id, helo_users.first, helo_users.last, helo_users.img, helo_friends.user_id, helo_friends.friend_id
FROM helo_users
FULL JOIN helo_friends ON helo_users.id = helo_friends.friend_id
WHERE helo_users.id != $1