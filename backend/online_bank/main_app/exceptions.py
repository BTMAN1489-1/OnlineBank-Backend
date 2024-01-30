from rest_framework.exceptions import APIException


class BadEnterException(APIException):
    status_code = 400
    default_detail = 'Перепроверьте данные запроса.'
    default_code = 'bad_enter'


class NotFoundException(APIException):
    status_code = 404
    default_detail = 'Запрашиваемые данные не были найдены'
    default_code = 'not_found'


class PermissionDenied(APIException):
    status_code = 403
    default_detail = 'Вам отказано в доступе'
    default_code = 'permission_denied'


class AuthenticationFailed(APIException):
    status_code = 401
    default_detail = 'Неудачная попытка аутентификации'
    default_code = 'authentication_failed'


class FailedOperationException(APIException):
    status_code = 406
    default_detail = "Ошибка при выполнении операции"
    default_code = 'failed_operation'

