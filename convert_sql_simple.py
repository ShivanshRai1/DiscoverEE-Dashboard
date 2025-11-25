import json
import re

sql_file = r"D:\DiscoverEE-Dashboard\DiscoverEE-Dashboard\datasheet_values_latest_live070222.sql"

print("Reading SQL file...")
with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

print("Finding INSERT statements...")
# Find the first INSERT statement to get column names
insert_start = content.find("INSERT INTO `datasheet_values_latest_live070222` (`did`")
if insert_start == -1:
    print("ERROR: Could not find INSERT statement!")
    exit(1)

# Extract column names from the first INSERT
cols_start = content.find("(", insert_start) + 1
cols_end = content.find(") VALUES", insert_start)
col_string = content[cols_start:cols_end]
columns = [c.strip().strip('`') for c in col_string.split(',')]

print(f"Found {len(columns)} columns")

# Create a mapping for the columns we need
needed_fields = [
    'did', 'fname', 'manf', 'partno', 'package', 'packagemanfname',
    'channel', 'config', 'auto', 'vds', 'vgs', 'vthtyp',
    'rdson1max', 'rdson2max', 'rdson3max', 'rdson4max',
    'rdsontyp10vgs25ta', 'rthja',
    'discoveree_package_cat1', 'discoveree_package_cat2',
    'mounting', 'material', 'part_status'
]

col_indices = {}
for field in needed_fields:
    try:
        col_indices[field] = columns.index(field)
    except ValueError:
        print(f"Warning: Column '{field}' not found")

print(f"Mapped {len(col_indices)} fields")

# Find all VALUES rows
print("Extracting data rows...")
values_pattern = r'\((\d+,.*?)\)(?:,|\;)'
matches = re.findall(values_pattern, content[insert_start:], re.DOTALL)

print(f"Found {len(matches)} data rows")

devices = []

def parse_sql_value(val):
    """Parse a SQL value"""
    val = val.strip()
    if val == 'NULL':
        return None
    elif val.startswith("'") and val.endswith("'"):
        return val[1:-1].replace("\\'", "'").replace("\\\\", "\\")
    else:
        try:
            if '.' in val:
                return float(val)
            else:
                return int(val)
        except:
            return val

def split_sql_values(row_str):
    """Split a SQL VALUES row into individual values"""
    values = []
    current = ""
    in_quotes = False
    i = 0
    
    while i < len(row_str):
        char = row_str[i]
        
        if char == '\\' and i + 1 < len(row_str):
            current += char + row_str[i + 1]
            i += 2
            continue
            
        if char == "'" and (i == 0 or row_str[i-1] != '\\'):
            in_quotes = not in_quotes
            current += char
        elif char == ',' and not in_quotes:
            values.append(parse_sql_value(current))
            current = ""
        else:
            current += char
        
        i += 1
    
    if current.strip():
        values.append(parse_sql_value(current))
    
    return values

print("Parsing devices...")
for idx, row in enumerate(matches):
    if idx % 100 == 0:
        print(f"  {idx}/{len(matches)}...")
    
    values = split_sql_values(row)
    
    if len(values) >= len(columns):
        device = {}
        for field, col_idx in col_indices.items():
            device[field] = values[col_idx]
        devices.append(device)

print(f"\nSuccessfully parsed {len(devices)} devices")

# Save to JSON
output_file = r"D:\DiscoverEE-Dashboard\DiscoverEE-Dashboard\src\data\devices.json"
print(f"Saving to {output_file}...")

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(devices, f, indent=2, ensure_ascii=False)

print(f"✓ Done! Saved {len(devices)} devices")
print(f"\nSample device:")
if devices:
    print(json.dumps(devices[0], indent=2))
