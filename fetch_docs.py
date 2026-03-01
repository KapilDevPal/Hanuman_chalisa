import requests
import json
import re
import os

docs = {
    "hanuman_ashtak": "1aihQ_ytEWTxnXBQYRravpfiIagrY2i7pGzoDHMajtk4",
    "hanuman_aarti": "1QVM3fw3_JgFyNIGsf5-yvyCyWw28zYaIALrUNE6bi80",
    "sundarkand": "1BIXU3MymHRXFLxqbniM_eZHf3hGTJxppZd1hqsPV6lk",
    "bajrang_baan": "1aW-5qPZ2zUwLzw-s2LcRYbkMo9WmqFlbcRIhxDj_l-w",
    "hanuman_raksha_mantra": "1IJDqUcqUBnK8AknnOlaZStV2rjj8759xCvidY5DRtqs",
    "mangalwar_katha": "1ICAm5ft2sG5Zj2OepDugOVLZvi9YOAGwhE2s8S2WRG0",
    "bahuk_path": "1UCUYiRSKKrpUnMpp_wh3mDnyI2BpfDOiRgSz7waiN7w",
    "ram_stuti": "13OIkbm_AUp-oSBoN0zRjl2YT2sykKpOZxRSkRWT1-QI",
    "panchmukhi_hanuman_kavach": "1ioSj_d_MceswZzB4vucO4M3aXPYj9y0oCqTbsYlN5WQ",
    "hanuman_gayatri_mantra": "1bjwH04b5SGYI83H8wv29-EwB-_SCINr-fDADEmwgqOQ",
    "hanuman_dwadash_naam_stotram": "1sNrhqDUiWqswrda-SxKCHrT7aTh816IJD0pxoSN2pqI"
}

output_dir = "/home/kapil-dev-pal/Desktop/apps/hanuman_chalisa/assets/data/hi"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for name, doc_id in docs.items():
    url = f"https://docs.google.com/document/export?format=txt&id={doc_id}"
    print(f"Fetching {name}...")
    resp = requests.get(url)
    if resp.status_code == 200:
        text = resp.text
        # Clean up text
        lines = [line.strip() for line in text.replace('\ufeff', '').split('\n') if line.strip()]
        
        if len(lines) > 0:
            title = lines[0]
            content = lines[1:]
        else:
            title = name.replace('_', ' ').title()
            content = []
            
        data = {
            "id": name,
            "title": title,
            "content": content
        }
        
        out_path = os.path.join(output_dir, f"{name}.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print(f"Saved {name}.json")
    else:
        print(f"Failed to fetch {name}: {resp.status_code}")
