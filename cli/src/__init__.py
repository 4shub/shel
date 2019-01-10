import requests
import json
import api


currentSessionId = None

def parse_message(msg):
    if (type(msg) is not dict):
        print(msg)
        return

    status = False

    try:
        status = api.pick(msg['api'])[msg['type']](msg.get('data') or {})
    except KeyboardInterrupt:
        raise
    except:
        print('Invalid operation - whoever configured this plugin did not configure this function properly!')

    if not status:
        exit()

    return status[0]


def send_request(args = None, next_step = 0):
    global currentSessionId

    payload = json.dumps({
        'command': ' '.join(args[1:]) or ' ',
        'sessionId': currentSessionId,
        'isFromCommandLine': True,
    })

    head = {"Content-type": "application/json"}

    r = requests.post("http://localhost:9000/plugin/" + args[0] + "/" + str(next_step), data=payload, headers=head, timeout=15000)

    if (r.status_code != 200 and r.status_code != 201):
        err = r.json()
        print(err.get('message'))
        return


    data = r.json()
    status = data.get('payload').get('status')
    currentSessionId = data.get('sessionId')
    args = args[:2]

    if (status):
        if (isinstance(status, list)):
            for msg in status:
                res = parse_message(msg)

                if res:
                    args.append(res)
        else:
            res = parse_message(status)

            if res:
                args.append(res)

    _next_step = data.get('nextStep');
    if (_next_step):
        send_request(args, _next_step)

import click

@click.command()
@click.argument('args', nargs=-1)
def cli(args):
    arg_list = list(args)

    if len(arg_list) <= 0:
        print('Please provide a plugin to talk with, type `shel plugins` to see all plugins')
        exit()

    send_request(list(args))

if __name__ == '__main__':
    cli()
