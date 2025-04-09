import os
import yaml
from datetime import datetime

# Define the schema for validation
SCHEMA = {
    "title": str,
    "scale": str,
    "maturity": str,
    "source": str,
    "created": datetime,
    "last_tended": datetime,
    "epistemic_status": str,
    "fmContentType": str,
    "pubDate": datetime,
}

# Path to the docs folder
DOCS_FOLDER = "src/content/docs"

# Function to validate frontmatter
def validate_frontmatter(file_path):
    errors = []
    try:
        with open(file_path, "r") as file:
            content = file.read()

        # Split frontmatter and body
        if content.startswith("---"):
            parts = content.split("---", 2)
            frontmatter = yaml.safe_load(parts[1])
        else:
            errors.append(f"No frontmatter found in {file_path}")
            return errors

        # Validate frontmatter fields
        for key, expected_type in SCHEMA.items():
            if key not in frontmatter:
                errors.append(f"Missing key '{key}' in {file_path}")
            elif not isinstance(frontmatter[key], expected_type):
                if expected_type == datetime:
                    try:
                        datetime.fromisoformat(frontmatter[key])
                    except (ValueError, TypeError):
                        errors.append(f"Invalid datetime format for key '{key}' in {file_path}")
                else:
                    errors.append(f"Incorrect type for key '{key}' in {file_path}")
    except Exception as e:
        errors.append(f"Error processing {file_path}: {e}")

    return errors

# Main function to validate all Markdown files
def main():
    all_errors = []
    for root, _, files in os.walk(DOCS_FOLDER):
        for file in files:
            if file.endswith(".md"):
                file_path = os.path.join(root, file)
                errors = validate_frontmatter(file_path)
                if errors:
                    all_errors.extend(errors)

    if all_errors:
        print("Validation Errors:")
        for error in all_errors:
            print(f"- {error}")
    else:
        print("All files passed validation.")

if __name__ == "__main__":
    main()