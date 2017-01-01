package com.thefantasyhof.ModelObjects;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Owner {
    // <editor-fold desc="Vars">
    private String name;
    private int wins = 0;
    private int losses = 0;
    private int ties = 0;
    private double pointsFor = 0;
    private double pointsAgainst = 0;
    private int playoffWins = 0;
    private int playoffLosses = 0;
    private double playoffPF = 0;
    private double playoffPA = 0;
    private Map<String, OwnerMatchupSeries> matchupSeries = new HashMap<String, OwnerMatchupSeries>();
    private Map<String, OwnerSeason> seasons = new HashMap<>();
    private ArrayList<WLSuperlative> mostWinsInSeason = new ArrayList<>();
    private ArrayList<WLSuperlative> mostLossesInSeason = new ArrayList<>();
    private ArrayList<PointsSuperlative> mostPointsForInSeason = new ArrayList<>();
    private ArrayList<PointsSuperlative> leastPointsForInSeason = new ArrayList<>();
    private ArrayList<PointsSuperlative> mostPointsForInGame = new ArrayList<>();
    private ArrayList<PointsSuperlative> leastPointsForInGame = new ArrayList<>();
    // </editor-fold>

    // <editor-fold desc="Getters/Setters">
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getWins() {
        return wins;
    }
    public void setWins(int wins) {
        this.wins = wins;
    }
    public int getLosses() {
        return losses;
    }
    public void setLosses(int losses) {
        this.losses = losses;
    }
    public int getTies() {
        return ties;
    }
    public void setTies(int ties) {
        this.ties = ties;
    }
    public double getPointsFor() {
        return pointsFor;
    }
    public void setPointsFor(double pointsFor) {
        this.pointsFor = pointsFor;
    }
    public double getPointsAgainst() {
        return pointsAgainst;
    }
    public void setPointsAgainst(double pointsAgainst) {
        this.pointsAgainst = pointsAgainst;
    }
    public int getPlayoffWins() {
        return playoffWins;
    }
    public void setPlayoffWins(int playoffWins) {
        this.playoffWins = playoffWins;
    }
    public int getPlayoffLosses() {
        return playoffLosses;
    }
    public void setPlayoffLosses(int playoffLosses) {
        this.playoffLosses = playoffLosses;
    }
    public double getPlayoffPF() {
        return playoffPF;
    }
    public void setPlayoffPF(double playoffPF) {
        this.playoffPF = playoffPF;
    }
    public double getPlayoffPA() {
        return playoffPA;
    }
    public void setPlayoffPA(double playoffPA) {
        this.playoffPA = playoffPA;
    }
    public Map<String, OwnerMatchupSeries> getMatchupSeries() {
        return matchupSeries;
    }
    public void setMatchupSeries(Map<String, OwnerMatchupSeries> matchupSeries) {
        this.matchupSeries = matchupSeries;
    }
    public Map<String, OwnerSeason> getSeasons() {
        return seasons;
    }
    public void setSeasons(Map<String, OwnerSeason> seasons) {
        this.seasons = seasons;
    }
    public ArrayList<WLSuperlative> getMostWinsInSeason() {
        return mostWinsInSeason;
    }
    public ArrayList<WLSuperlative> getMostLossesInSeason() {
        return mostLossesInSeason;
    }
    public ArrayList<PointsSuperlative> getMostPointsForInSeason() {
        return mostPointsForInSeason;
    }
    public ArrayList<PointsSuperlative> getLeastPointsForInSeason() {
        return leastPointsForInSeason;
    }
    public ArrayList<PointsSuperlative> getMostPointsForInGame() {
        return mostPointsForInGame;
    }
    public ArrayList<PointsSuperlative> getLeastPointsForInGame() {
        return leastPointsForInGame;
    }
// </editor-fold>

    public Owner(String ownerName) {
        this.name = ownerName;
    }

    public void addSeasonData(int wins, int losses, double pointsFor, double pointsAgainst) {
        this.wins += wins;
        this.losses += losses;
        this.pointsFor += pointsFor;
        this.pointsAgainst += pointsAgainst;
    }
    public void addMatchupData(Matchup matchup) {
        // Basic Stats
        int win = 0;
        int loss = 0;
        int tie = 0;
        String year = matchup.getYear();
        boolean isPlayoffs = matchup.getPlayoffs();
        double pointsFor = name.equals(matchup.getHomeOwner()) ? matchup.getHomePoints() : matchup.getAwayPoints();
        double pointsAgainst = name.equals(matchup.getHomeOwner()) ? matchup.getAwayPoints() : matchup.getHomePoints();
        String teamName = name.equals(matchup.getHomeOwner()) ? matchup.getHomeTeamName() : matchup.getAwayTeamName();

        if (pointsFor > pointsAgainst) {win++;}
        else if (pointsFor == pointsAgainst && !isPlayoffs) { tie++; }
        else { loss++; }

        if (!isPlayoffs) {
            // Regular season
            this.wins += win;
            this.losses += loss;
            this.ties += tie;

            this.pointsFor += pointsFor;
            this.pointsAgainst += pointsAgainst;
        } else {
            // Playoffs
            this.playoffWins += win;
            this.playoffLosses += loss;

            this.playoffPF += pointsFor;
            this.playoffPA += pointsAgainst;
        }

        // Add the stats to the owner's corresponding season object (not for playoffs)
        if (!isPlayoffs) {
            if (this.seasons.get(year) == null) {
                // Add an OwnerSeason object to our map
                this.seasons.put(year, new OwnerSeason(win, loss, tie, year, pointsFor, pointsAgainst, teamName));
            } else {
                // Add to the OwnerSeason object
                OwnerSeason ownersSeason = this.seasons.get(year);
                ownersSeason.setWins(ownersSeason.getWins() + win);
                ownersSeason.setLosses(ownersSeason.getLosses() + loss);
                ownersSeason.setTies(ownersSeason.getTies() + tie);
                ownersSeason.setPointsFor(ownersSeason.getPointsFor() + pointsFor);
                ownersSeason.setPointsAgainst(ownersSeason.getPointsAgainst() + pointsAgainst);
                this.seasons.put(year, ownersSeason);
            }
        }

        // Add to the owner matchup series
        String opponentName = name.equals(matchup.getHomeOwner()) ? matchup.getAwayOwner() : matchup.getHomeOwner();
        if (matchupSeries.get(opponentName) == null) {
            // Add an entry for this owner
            matchupSeries.put(opponentName, new OwnerMatchupSeries(opponentName, win, loss, tie, pointsFor, pointsAgainst));
        } else {
            // Change an existing entry by reference
            OwnerMatchupSeries opponentMatchup = matchupSeries.get(opponentName);
            opponentMatchup.setWins(opponentMatchup.getWins() + win);
            opponentMatchup.setLosses(opponentMatchup.getLosses() + loss);
            opponentMatchup.setTies(opponentMatchup.getTies() + tie);
            opponentMatchup.setPointsFor(opponentMatchup.getPointsFor() + pointsFor);
            opponentMatchup.setOpponentPoints(opponentMatchup.getOpponentPoints() + pointsAgainst);
        }

        // Add to single game superlatives
        // Set the highest score in a game (just regular season)
        if (!isPlayoffs) {
            if (this.mostPointsForInGame.size() == 0) {
                this.mostPointsForInGame.add(new PointsSuperlative(this.name, teamName, year, pointsFor));
            } else {
                double highScore = this.mostPointsForInGame.get(0).getValue();
                if (pointsFor == highScore) {
                    this.mostPointsForInGame.add(new PointsSuperlative(this.name, teamName, year, pointsFor));
                } else if (pointsFor > highScore) {
                    this.mostPointsForInGame.clear();
                    this.mostPointsForInGame.add(new PointsSuperlative(this.name, teamName, year, pointsFor));
                }
            }
        }

        // Set the lowest score in a game
        if (!isPlayoffs) {
            if (this.leastPointsForInGame.size() == 0) {
                this.leastPointsForInGame.add(new PointsSuperlative(this.name, teamName, year, pointsFor));
            } else {
                double lowScore = this.leastPointsForInGame.get(0).getValue();
                if (pointsFor == lowScore) {
                    this.leastPointsForInGame.add(new PointsSuperlative(this.name, teamName, year, pointsFor));
                } else if (pointsFor < lowScore) {
                    this.leastPointsForInGame.clear();
                    this.leastPointsForInGame.add(new PointsSuperlative(this.name, teamName, year, pointsFor));
                }
            }
        }
    }
    // Calculate the most wins, losses, points for, and p[oints against that an owner has had in a season. This DOES NOT
    // calculate the most points an owner has ever scored in a single matchup. That is done in this.addMatchupData
    public void calculateOwnerSuperlatives() {
        Map<String, OwnerSeason> seasons = this.getSeasons();

        // Iterate over each season
        for (Map.Entry<String, OwnerSeason> entry : this.getSeasons().entrySet()) {
            String year = entry.getKey();
            OwnerSeason season = entry.getValue();

            // Set the most wins in a season
            if (this.mostWinsInSeason.size() == 0) {
                this.mostWinsInSeason.add(new WLSuperlative(this.name, season.getTeamName(), year, season.getWins()));
            } else {
                int mostWins = this.mostWinsInSeason.get(0).getValue();
                if (season.getWins() == mostWins) {
                    this.mostWinsInSeason.add(new WLSuperlative(this.name, season.getTeamName(), year, season.getWins()));
                } else if (season.getWins() > mostWins) {
                    this.mostWinsInSeason.clear();
                    this.mostWinsInSeason.add(new WLSuperlative(this.name, season.getTeamName(), year, season.getWins()));
                }
            }

            // Set the most losses in a season
            if (this.mostLossesInSeason.size() == 0) {
                this.mostLossesInSeason.add(new WLSuperlative(this.name, season.getTeamName(), year, season.getLosses()));
            } else {
                int mostLosses = this.mostLossesInSeason.get(0).getValue();
                if (season.getLosses() == mostLosses) {
                    this.mostLossesInSeason.add(new WLSuperlative(this.name, season.getTeamName(), year, season.getLosses()));
                } else if (season.getLosses() > mostLosses) {
                    this.mostLossesInSeason.clear();
                    this.mostLossesInSeason.add(new WLSuperlative(this.name, season.getTeamName(), year, season.getLosses()));
                }
            }

            // Set the highest total score in a season
            if (this.mostPointsForInSeason.size() == 0) {
                this.mostPointsForInSeason.add(new PointsSuperlative(this.name, season.getTeamName(), year, season.getPointsFor()));
            } else {
                double highTotalScore = this.mostPointsForInSeason.get(0).getValue();
                if (season.getPointsFor() == highTotalScore) {
                    this.mostPointsForInSeason.add(new PointsSuperlative(this.name, season.getTeamName(), year, season.getPointsFor()));
                } else if (season.getPointsFor() > highTotalScore) {
                    this.mostPointsForInSeason.clear();
                    this.mostPointsForInSeason.add(new PointsSuperlative(this.name, season.getTeamName(), year, season.getPointsFor()));
                }
            }

            // Set the lowest total score in a season
            if (this.leastPointsForInSeason.size() == 0) {
                this.leastPointsForInSeason.add(new PointsSuperlative(this.name, season.getTeamName(), year, season.getPointsFor()));
            } else {
                double lowTotalScore = this.leastPointsForInSeason.get(0).getValue();
                if (season.getPointsFor() == lowTotalScore) {
                    this.leastPointsForInSeason.add(new PointsSuperlative(this.name, season.getTeamName(), year, season.getPointsFor()));
                } else if (season.getPointsFor() < lowTotalScore) {
                    this.leastPointsForInSeason.clear();
                    this.leastPointsForInSeason.add(new PointsSuperlative(this.name, season.getTeamName(), year, season.getPointsFor()));
                }
            }
        }
    }
}
