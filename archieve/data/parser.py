import json

def split_ayah(ayah):
    # Split from and to ayah
    ayah = ayah.split('-')
    if len(ayah) == 1:
        from_ayah = to_ayah = int(ayah[0])
    else:
        from_ayah = int(ayah[0])
        to_ayah = int(ayah[1])

    return from_ayah, to_ayah

with open('quran_data.txt','r') as data:
    file_data = {}
    last_num = 0
    for line in data:
        if line.startswith('QS ') or line.startswith('Done '):
            qs, surah_num, surah_name, ayah = line.split(' ')
            surah_num = int(surah_num)

            # Write or append
            if surah_num > last_num or qs == 'Done':
                if surah_num > 0 and surah_num < 114: # Skip saving file if num is not between 1-114
                    print(f"Write new file: surah {last_num}")
                    with open(f'quran_list/{last_num}.json', 'w') as output:
                        output.write(json.dumps(file_data))

                last_num = surah_num
                file_data = {
                    "name": surah_name.replace(':', ''),
                    "number": surah_num,
                    "meaning": []
                }
                
            
            from_ayah, to_ayah = split_ayah(ayah)
            meaning = {
                "from": from_ayah,
                "to": to_ayah,
                "text": next(data).replace('\n','')
            }
            file_data['theme'].append(meaning)


# {
#     "name": surah_name,
#     "number": surah_num,
#     "meaning": [
#         {"from": from, "to": to, "text": text }
#     ]
# }