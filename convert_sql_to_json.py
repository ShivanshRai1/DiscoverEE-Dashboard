import re
import json

# Read the SQL file
sql_file = r"D:\DiscoverEE-Dashboard\DiscoverEE-Dashboard\datasheet_values_latest_live070222.sql"

print("Reading SQL file...")
with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

print("Extracting column names...")
# Get column names from INSERT statement - look for the actual INSERT, not CREATE TABLE
col_pattern = r"INSERT INTO `datasheet_values_latest_live070222` \((.*?)\) VALUES"
col_matches = re.findall(col_pattern, content, re.DOTALL)

# Find the INSERT that's not part of CREATE TABLE (should be near the end)
col_string = None
for match in col_matches:
    if 'NOT NULL' not in match and 'DEFAULT' not in match:
        col_string = match
        break

if col_string:
    columns = [c.strip().strip('`') for c in col_string.split(',')]
    print(f"Found {len(columns)} columns")
else:
    print("ERROR: Could not find column names!")
    exit(1)

# Create column index mapping
col_index = {name: idx for idx, name in enumerate(columns)}

print("Extracting INSERT data...")
# Find the VALUES part - match each row individually
rows_pattern = r"\((\d+,.*?)\)(?:,|\;)"
matches = re.findall(rows_pattern, content, re.DOTALL)

print(f"Found {len(matches)} data rows")

devices = []

def parse_value(val):
    """Parse a single SQL value"""
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

def split_sql_row(row_string):
    """Split a SQL row into values"""
    values = []
    current = ""
    in_quotes = False
    
    for i, char in enumerate(row_string):
        if char == "'" and (i == 0 or row_string[i-1] != '\\'):
            in_quotes = not in_quotes
            current += char
        elif char == ',' and not in_quotes:
            values.append(parse_value(current))
            current = ""
        else:
            current += char
    
    if current.strip():
        values.append(parse_value(current))
    
    return values

print("Parsing device data...")
for idx, row in enumerate(matches):
    if idx % 100 == 0:
        print(f"Processing {idx}/{len(matches)}...")
    
    values = split_sql_row(row)
    
    if len(values) >= len(columns):
        # Extract only the fields we need using column indices
        device = {
            'did': values[col_index.get('did', 0)],
            'fname': values[col_index.get('fname', 1)],
            'manf': values[col_index.get('manf', 2)],
            'partno': values[col_index.get('partno', 3)],
            'package': values[col_index.get('package', 4)],
            'packagemanfname': values[col_index.get('packagemanfname', 5)],
            'channel': values[col_index.get('channel', 6)],
            'config': values[col_index.get('config', 7)],
            'auto': values[col_index.get('auto', 8)],
            'vds': values[col_index.get('vds', 12)],
            'vgs': values[col_index.get('vgs', 13)],
            'vthtyp': values[col_index.get('vthtyp', col_index.get('vthtyp', None))],
            'rdson1max': values[col_index.get('rdson1max', col_index.get('rdson1max', None))],
            'rdson2max': values[col_index.get('rdson2max', col_index.get('rdson2max', None))],
            'rdson3max': values[col_index.get('rdson3max', col_index.get('rdson3max', None))],
            'rdson4max': values[col_index.get('rdson4max', col_index.get('rdson4max', None))],
            'rdsontyp10vgs25ta': values[col_index.get('rdsontyp10vgs25ta', col_index.get('rdsontyp10vgs25ta', None))],
            'rthja': values[col_index.get('rthja', col_index.get('rthja', None))],
            'discoveree_package_cat1': values[col_index.get('discoveree_package_cat1', col_index.get('discoveree_package_cat1', None))],
            'discoveree_package_cat2': values[col_index.get('discoveree_package_cat2', col_index.get('discoveree_package_cat2', None))],
            'mounting': values[col_index.get('mounting', col_index.get('mounting', None))],
            'material': values[col_index.get('material', col_index.get('material', None))],
            'part_status': values[col_index.get('part_status', col_index.get('part_status', None))],
        }
        devices.append(device)

print(f"\nSuccessfully parsed {len(devices)} devices")

# Save to JSON
output_file = r"D:\DiscoverEE-Dashboard\DiscoverEE-Dashboard\src\data\devices.json"
print(f"Saving to {output_file}...")

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(devices, f, indent=2, ensure_ascii=False)

print(f"✓ Conversion complete! Saved {len(devices)} devices to devices.json")
