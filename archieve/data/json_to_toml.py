import json
import toml

for i in range(1, 115):
    try:
        with open(f'quran_list/{i}.json','r') as file:
            data = json.loads(file.read())
            toml_data = toml.dumps(data)
            with open(f'toml/{i}.toml', 'w') as output:
                output.write(toml_data)
    except FileNotFoundError:
        print(f'{i} not found')
        continue