import os
import shutil
from jinja2 import Environment, FileSystemLoader

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.join(BASE_DIR, 'dist')

PAGES = ['index.html', 'notes.html']


def build():
    shutil.rmtree(DIST_DIR, ignore_errors=True)
    os.makedirs(DIST_DIR)

    env = Environment(loader=FileSystemLoader(os.path.join(BASE_DIR, 'templates')))
    for page in PAGES:
        with open(os.path.join(DIST_DIR, page), 'w', encoding='utf-8') as f:
            f.write(env.get_template(page).render())

    shutil.copytree(os.path.join(BASE_DIR, 'static'), os.path.join(DIST_DIR, 'static'))
    print(f"Built static site in {DIST_DIR}")


if __name__ == '__main__':
    build()
