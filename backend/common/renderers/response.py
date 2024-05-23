from rest_framework.renderers import JSONRenderer

class CustomJSONRenderer(JSONRenderer):
    def render(self, data, accepted_media_type=None, renderer_context=None):
        status_code = renderer_context['response'].status_code
        response = {
            'status': 'success' if status_code < 400 else 'error',
            'code': status_code,
            'data': data,
            'message': data.get('message', None)
        }
        return super().render(response, accepted_media_type, renderer_context)