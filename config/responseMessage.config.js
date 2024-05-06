let HttpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
    UNAUTHORIZED: 403
}

module.exports = {

    OK_200: {
        'success': 'عملیات با موفقیت انجام شد',
    },
    BAD_REQUEST_400: {

        'error_input': 'عدم ارسال صحیح ورودی ها',
        'not_found': 'موردی با این مشخصات یافت نشد',
        'duplicate_record': 'رکورد تکراری',
    },
    NOT_FOUND_404: {
        'not_found': 'مقداری وجود ندارد'
    },
    UNAUTHORIZED_403: {
        'no_access_permission': 'خطا: عدم مجوز دسترسی',

    },
    INTERNAL_SERVER_500: {
        'server_error': 'خطا: خطا در سمت سرور',
    }

}
