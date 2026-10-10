# Cosmic Detector: how to run

One deep-learning model (1D residual CNN) that detects exoplanet transits, microlensing events
(black-hole candidates when tE > 100 days) and asteroid rotation in REAL light curves.

## Files
- `Cosmic_Detector.ipynb`: the project. Run this in Google Colab.
- `Cosmic_Detector_REAL_RESULTS.ipynb`: the same notebook with all outputs from our real run
  (13 charts, all tables). Open it to show results without re-running.
- `App_screenshot.png`: the web app analysing OGLE-2019-BLG-0001.

## Data (all real, all free)
| Put in Google Drive `MyDrive/CosmicData/` | Source |
|---|---|
| `exoTrain.csv`, `exoTest.csv` (or `kaggle.json`) | kaggle.com/datasets/keplersky/kepler-labelled-time-series-data |
| `phot.tar` (or phot.tar.gz), `table3.dat` | ftp.astrouw.edu.pl/ogle/ogle4/microlensing_maps/ |
| folder `gbo.ast.alcdef-database_V1_0` | sbn.psi.edu/pds/resource/alcdef.html |
| optional: `ews/blg-0001.tar` (2018+ OGLE events) | ogle.astrouw.edu.pl/ogle4/ews/ews.html |
Anything missing is downloaded automatically.

## Run
1. colab.research.google.com → File → Upload notebook → `Cosmic_Detector.ipynb`
2. Runtime → Change runtime type → T4 GPU
3. Runtime → Run all (allow Google Drive). It takes about 15–25 min.
4. Open the `https://….gradio.live` link printed at the end.

## Real results (12-epoch CPU run, 2,900 held-out light curves)
- Overall accuracy 99.5% (15 mistakes); macro-F1 0.896 (Random Forest baseline 0.829)
- Lensing in OGLE: 616/619 found, 7 false alarms
- Asteroids: 893/894
- Planets in Kepler test set: 3/5 found, 2 false alarms (only 42 planets exist in the data)
- Shape-only model (no duration input): 95.1% accuracy
- tE fit within 20% of OGLE's published value for 87% of test events
