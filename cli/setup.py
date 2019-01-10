from setuptools import setup, find_packages

setup(
    name="shel",
    version='0.1.1r-12',
    packages=[
        '',
        'api'
    ],
    package_dir={'': 'src'},
    install_requires=[
        'Click',
        'requests',
    ],
    entry_points='''
        [console_scripts]
        shel=shel:cli
    ''',
)
