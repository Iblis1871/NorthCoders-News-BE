`
      UPDATE articles
      SET inc_votes = (votes +$1)
      WHERE article_id = $2
      RETURNING *;`