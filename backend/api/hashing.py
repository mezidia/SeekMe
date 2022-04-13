from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Hash:
    def bcrypt(password: str) -> str:
        """
        bcrypt hashes the password.

        :param password: password to be hashed.
        :return: hashed password.
        """

        return pwd_context.hash(password)

    def verify(plain_password: str, hashed_password: str) -> bool:
        """
        verify checks if the password matches its hashed version.

        :param plain_password: not hashed password.
        :param hashed_password: hashed password.
        :return: True if the password match, False if not.
        """

        return pwd_context.verify(plain_password, hashed_password)
