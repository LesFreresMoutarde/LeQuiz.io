<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * CategoryQuestion
 *
 * @ORM\Table(name="category_question", indexes={@ORM\Index(name="IDX_18DCD35C4A4EA2C", columns={""categoryId""}), @ORM\Index(name="IDX_18DCD35C8C58171", columns={""questionId""})})
 * @ORM\Entity
 */
class CategoryQuestion
{
    /**
     * @var string
     *
     * @ORM\Column(name="categoryId", type="guid", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $categoryid;

    /**
     * @var string
     *
     * @ORM\Column(name="questionId", type="guid", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $questionid;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetimetz", nullable=false)
     */
    private $createdat;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updatedAt", type="datetimetz", nullable=false)
     */
    private $updatedat;

    /**
     * @var \Category
     *
     * @ORM\ManyToOne(targetEntity="Category")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name=""categoryId"", referencedColumnName="id")
     * })
     */
    private $"categoryid";

    /**
     * @var \Question
     *
     * @ORM\ManyToOne(targetEntity="Question")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name=""questionId"", referencedColumnName="id")
     * })
     */
    private $"questionid";


}
