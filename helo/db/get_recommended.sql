SELECT * FROM helo_users
WHERE id != ($1) AND id NOT IN (SELECT friend_id from helo_friends 
RIGHT JOIN helo_users ON helo_friends.friend_id = helo_users.id
WHERE friend_id != ($1) OR user_id != ($1))