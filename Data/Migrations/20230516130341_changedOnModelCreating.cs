using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class changedOnModelCreating : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlaylistTracks_Playlist_PlaylistId",
                table: "PlaylistTracks");

            migrationBuilder.AddForeignKey(
                name: "FK_PlaylistTracks_Playlist_PlaylistId",
                table: "PlaylistTracks",
                column: "PlaylistId",
                principalTable: "Playlist",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlaylistTracks_Playlist_PlaylistId",
                table: "PlaylistTracks");

            migrationBuilder.AddForeignKey(
                name: "FK_PlaylistTracks_Playlist_PlaylistId",
                table: "PlaylistTracks",
                column: "PlaylistId",
                principalTable: "Playlist",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
