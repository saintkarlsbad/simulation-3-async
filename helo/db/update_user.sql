UPDATE helo_users
SET first = $2, 
    last = $3, 
    gender = $4, 
    hair_color = $5, 
    eye_color = $6, 
    hobby =  $7, 
    birth_date = $8, 
    birth_month = $9, 
    birth_year = $10
WHERE id = $1

-- SELECT * FROM helo_users
-- WHERE id = $1
