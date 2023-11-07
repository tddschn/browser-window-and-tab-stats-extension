#!/usr/bin/env python3
"""
Author : Xinyuan Chen <45612704+tddschn@users.noreply.github.com>
Date   : 2023-11-07
Purpose: Convert screenshots to specified geometry and create icons
"""

import argparse
import subprocess
from pathlib import Path
from shlex import quote


def get_args():
    """Get command-line arguments"""

    parser = argparse.ArgumentParser(
        description="Convert screenshots to specified geometry and create icons",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )

    parser.add_argument(
        "-d",
        "--distort",
        action="store_true",
        help="Distort images to exactly fit the target resolution",
    )

    parser.add_argument(
        "--icons-from",
        metavar="ICON",
        help="Create 48x48 and 128x128 icon files from a source icon file",
    )

    return parser.parse_args()


def main():
    """Make a jazz noise here"""

    args = get_args()

    # If the icons-from flag is used, generate icon files
    if args.icons_from:
        icon_file_path = Path(args.icons_from)
        if icon_file_path.is_file():
            for size in [48, 128]:
                icon_file_name = (
                    f"{icon_file_path.stem}-{size}x{size}{icon_file_path.suffix}"
                )
                icon_file_path_output = icon_file_path.parent / icon_file_name
                # command = f"convert -resize {size}x{size} {quote(str(icon_file_path))} {quote(str(icon_file_path_output))}"
                # distort
                command = f"convert -resize {size}x{size}! {quote(str(icon_file_path))} {quote(str(icon_file_path_output))}"

                # Execute the convert command
                try:
                    print(f'Running command "{command}"')
                    subprocess.run(command, check=True, shell=True)
                    print(f"Created icon {icon_file_path_output}")
                except subprocess.CalledProcessError as e:
                    print(f"Error creating icon {icon_file_path_output}: {e}")
        else:
            print(f"The icon file {args.icons_from} does not exist.")
        return

    # Define the directory and target resolution
    directory = Path("screenshots")
    target_resolution = "1280x800"

    # Verify if the directory exists
    if not directory.is_dir():
        print(f"The directory {directory} does not exist.")
        return

    # List all files in the screenshots directory
    for file_path in directory.glob("*.png"):
        # Skip files that already have the target resolution in their name or if it is the icon source file
        if file_path.stem.endswith(f"-{target_resolution}") or (
            args.icons_from and file_path.name == args.icons_from
        ):
            continue

        # Generate the new filename with the target resolution
        new_file_name = f"{file_path.stem}-{target_resolution}{file_path.suffix}"
        new_file_path = directory / new_file_name

        # Construct the convert command with or without distortion
        resize_option = f"{target_resolution}!" if args.distort else target_resolution
        command = f"convert -resize {resize_option} {quote(str(file_path))} {quote(str(new_file_path))}"

        # Execute the convert command
        try:
            subprocess.run(command, check=True, shell=True)
            print(f"Converted {file_path} to {new_file_path}")
        except subprocess.CalledProcessError as e:
            print(f"Error converting {file_path}: {e}")


if __name__ == "__main__":
    main()
