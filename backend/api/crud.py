from sqlalchemy.orm import Session

import models


class PostCrud:
    def get_users(db: Session):
        return db.query(models.PostModel).all()

        
