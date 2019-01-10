def requiredTextResponse(data):
    answer = data.get('answer')
    meta = data.get('meta')
    failOn = meta.get('failOn')

    retries = int(meta.get('retries') or 1)

    if (meta.get('retryForever') is True):
        retries = 9999999

    matchANS = ''
    retryCount = 0

    while(matchANS != answer and (retries > retryCount)):
        matchANS = input(data['question'] + ' ')
        retryCount += 1

        if (failOn and failOn == matchANS):
            return False

    return [matchANS]


interactivity = {
    'requiredTextResponse': requiredTextResponse,
}