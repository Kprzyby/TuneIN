using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedFileEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "TrackInfo",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "FileEntities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Data = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    FileDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrackId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileEntities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FileEntities_TrackInfo_TrackId",
                        column: x => x.TrackId,
                        principalTable: "TrackInfo",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrackInfo_UserId",
                table: "TrackInfo",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FileEntities_TrackId",
                table: "FileEntities",
                column: "TrackId");

            migrationBuilder.AddForeignKey(
                name: "FK_TrackInfo_User_UserId",
                table: "TrackInfo",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrackInfo_User_UserId",
                table: "TrackInfo");

            migrationBuilder.DropTable(
                name: "FileEntities");

            migrationBuilder.DropIndex(
                name: "IX_TrackInfo_UserId",
                table: "TrackInfo");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "TrackInfo");
        }
    }
}
