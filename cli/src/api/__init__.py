from api.interactivity import interactivity

options = {
    'interactivity': interactivity,
}

def pick(type):
    try:
        if options[type]:
            return options[type]
    except:
     return 'Invalid type'
